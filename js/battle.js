import { FURY_BURST_THRESHOLD, BATTLE_TIME_LIMIT_MS, SKILL_TRIGGER_PERCENT_PER_HIT, PARRY_PERCENT_PER_RES, CRIT_PERCENT_PER_CRT, DODGE_PERCENT_PER_EVA } from "./config.js";
import { DamageType, SkillPhase, SkillTarget, SkillType, StatusType } from "./data/categories.js";
import CFDB from "./data/CFDB.js";
import PetSkills from "./data/petSkills.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Status from "./data/status.js";
import Utils from "./utils.js";

export function simulateBattle(left, right, debug = false) {
  const logs = [];
  const leftPlayers = left.map(player => createPlayerForBattle(player, 0));
  const rightPlayers = right.map(player => createPlayerForBattle(player, 1));
  leftPlayers.forEach((player, i) => {
    player.id = i * 2;
    logs.push(`|player|${player.id}|${JSON.stringify(left[i])}`);
  });
  rightPlayers.forEach((player, i) => {
    player.id = i * 2 + 1;
    logs.push(`|player|${player.id}|${JSON.stringify(right[i])}`);
  });
  let currentIndex = [0, 0];
  while (currentIndex[0] < left.length && currentIndex[1] < right.length) {
    let state = {
      debug,
      players: [leftPlayers[currentIndex[0]], rightPlayers[currentIndex[1]]],
      timer: 0,
      someoneDied: false,
      log: []
    }
    // before round cleanup
    prepareSkills(state);
    state.players.forEach(player => player.status = []);
    startBattle(state);
    state.players.forEach(player => {
      if (player.stats.current.hp <= 0) {
        ++currentIndex[player.index];
      }
    });
    if (debug) console.log(state);
    logs.push(...state.log);
  }
  return {
    winner: rightPlayers[rightPlayers.length - 1].stats.current.hp <= 0 ? 0 : 1,
    logs
  };
}

function createPlayerForBattle(player, index) {
  return {
    name: player.name.replace("|", ""),
    index: index,
    stats: {
      initial: Utils.deepClone(player.stats),
      current: Utils.deepClone(player.stats)
    },
    mastery: CFDB.getFighter(player.fighter.name).mastery,
    expertise: player.expertise,
    resistance: player.resistance,
    fury: 0,
    furyBursts: 0,
    skills: populateSkills(player),
    status: []
  }
}

function populateSkills(player) {
  const skills = []
  if (player.skills) {
    player.skills.forEach(skill => skills.push(createSkillForBattle(skill)));
  }
  if (player.phylactery) {
    const phylacterySkill = createSkillForBattle(player.phylactery.skill);
    skills.push(phylacterySkill);
    skills.forEach(skill => {
      if (skill.type === phylacterySkill.type) {
        skill.triggerPercent += player.phylactery.extraTriggerPercent;
      }
    })
  }
  if (player.pet.skills) {
    player.pet.skills.forEach(skill => skills.push(createSkillForBattle(skill)));
  }
  if (player.fighter.skills) {
    player.fighter.skills.forEach(skill => skills.push(createSkillForBattle(skill)));
  }
  if (player.totem) {
    skills.push(createSkillFromTotem(player.totem));
  }
  return skills;
}

function createSkillFromTotem(totem) {
  const baseSkill = getBaseSkill(totem.name);
  const newSkill = Utils.deepClone(baseSkill);
  if (newSkill.triggerPercentPerLevel) {
    newSkill.triggerPercent += newSkill.triggerPercentPerLevel * (totem.level - 1);
  }
  if (newSkill.effectIncreasePerLevel) {
    newSkill.effectIncrease = newSkill.effectIncreasePerLevel * (totem.level - 1);
  }
  return newSkill;
}

function prepareSkills(state) {
  state.players.forEach((player, i) => {
    const calculatedExpertise = player.expertise.filter(x => !state.players[i ^ 1].resistance.includes(x));
    player.skills.forEach(skill => {
      if (calculatedExpertise.includes(skill.type)) {
        skill.getExpertiseVersion();
      } else if (skill.getNormalVersion) {
        skill.getNormalVersion();
      }
      if (player.mastery.toLowerCase() === skill.type?.toLowerCase()) {
        skill.triggerPercent += 5;
        // temp workaround
        if (skill.name === Skills.rebirth.name) skill.triggerPercent += 5;
      }
      if (skill.maxTriggerTimes && CFDB.getSkill(skill.name)) {
        skill.remainingUses = skill.maxTriggerTimes;
      }
    })
  });
}

function getBaseSkill(name) {
  return [...CFDB.getSkills(), ...CFDB.getPetCombatSkills(),
  ...CFDB.getFighterCombatSkills(), ...CFDB.getTotems()]
    .find(skill => skill.name === name);
}

function createSkillForBattle(skillname) {
  const baseSkill = getBaseSkill(skillname);
  const newSkill = Utils.deepClone(baseSkill);
  if (baseSkill.getNormalVersion) newSkill.getNormalVersion = baseSkill.getNormalVersion;
  if (baseSkill.getExpertiseVersion) newSkill.getExpertiseVersion = baseSkill.getExpertiseVersion;
  if (newSkill.maxTriggerTimes) {
    newSkill.remainingUses = newSkill.maxTriggerTimes;
  }
  return newSkill;
}

export function startBattle(state) {
  state.log.push(`|vs|${state.players[0].id}|${state.players[1].id}`);
  state.players.forEach(player => getAllSkillsEligibleToBeUsed(state, player.index, SkillPhase.beforeFight)
    .forEach(skill => useSkill(state, player.index, skill)));
  // start game timer, measured in ms mainly to avoid decimals
  while (state.timer < BATTLE_TIME_LIMIT_MS) {
    if (state.someoneDied) break;
    // e.g. 715 spd = 1.4s/attack = 1400ms/attack
    // so should attack whenever timer is at 1400, 2800, etc
    getPlayersEligibleToTakeTurn(state).forEach(player => {
      if (state.someoneDied) return;
      if (getDebuffs(state, player.index ^ 1).length > 0) {
        tryToUseSkillFromPhase(state, player.index ^ 1, SkillPhase.onDebuff);
      }
      if (player.status.some(x => x.effect.skipTurn)) return;
      // turn start
      state.log.push(`|turn|${player.id}|${state.timer / 1000}`);
      const skipActions = player.status.some(x => x.effect.skipActions);
      handleStartOfTurnStatusEffects(state, player.index);
      handleStatusBetrayal(state);
      do {
        delete player.restartTurnAfterNextAttack;
        tryToUseSkillFromPhase(state, player.index ^ 1, SkillPhase.beforeEnemyAttack);
        if (skipActions) return;
        tryToUseSkillFromPhase(state, player.index, SkillPhase.beforeYourAttack);
        if (tryToUseSkillFromPhase(state, player.index, SkillPhase.duringYourAttack)) {
          tryToUseSkillFromPhase(state, player.index ^ 1, SkillPhase.duringEnemyAttack);
        }
      } while (player.restartTurnAfterNextAttack);
      if (tryToUseSkillFromPhase(state, player.index, SkillPhase.afterYourAttack)) {
        tryToUseSkillFromPhase(state, player.index ^ 1, SkillPhase.duringEnemyAttack);
      }
      tryToUseSkillFromPhase(state, player.index, SkillPhase.petAttack);
    });
    state.timer += 100;
    handleTimerRelatedStatusEffects(state);
  }
  state.log.push(`|win|${state.players[1].stats.current.hp > 0 ? state.players[1].id : state.players[0].id}`);
}

function getAllSkillsEligibleToBeUsed(state, playerIndex, phase) {
  return state.players[playerIndex].skills.filter(skill => skill.phase === phase)
    .filter(skill => state.players[playerIndex].status.some(x => x.effect.skipActions) ? skill.notAnAction : true)
    .filter(skill => skill.spConsumption ? state.players[playerIndex].stats.current.sp >= skill.spConsumption : true)
    .filter(skill => areActiveSkillsDisabled(state, playerIndex, phase) ? skill.bypassDisableActiveSkills : true)
    .filter(skill => skill.maxTriggerTimes ? skill.remainingUses > 0 : true)
    .filter(skill => skill.effect?.removeRandomDebuff ? getDebuffs(state, playerIndex).length > 0 : true)
    .filter(skill => skill.cantUseIfThunderGodIsActive ? !isThunderGodActive(state) : true)
    .filter(skill => skill.canUseIfHpNotFullOrPoisoned ? isHpNotFullOrPoisoned(state, playerIndex) : true)
    .filter(skill => skill.numberOfFuryBursts ? state.players[playerIndex].furyBursts % skill.numberOfFuryBursts === 0 : true)
    .filter(skill => Utils.testProbability(getSkillTriggerProbability(state, playerIndex, skill)));
}

function getSkillTriggerProbability(state, playerIndex, skill) {
  let hitFlatTriggerPercent = 0;
  if (Utils.equalsAny(skill.phase, SkillPhase.beforeYourAttack, SkillPhase.duringYourAttack, SkillPhase.afterYourAttack,)) {
    hitFlatTriggerPercent += state.players[playerIndex].stats.current.hit * SKILL_TRIGGER_PERCENT_PER_HIT;
  }
  let modifiedBaseFlatTriggerPercent = 0;
  if (skill.effect?.reduceTriggerPercentPerTenSeconds) {
    modifiedBaseFlatTriggerPercent -= Math.floor(state.timer / 10000) * skill.effect.reduceTriggerPercentPerTenSeconds;
  }
  let triggerProbabilityMultiplier = 1;
  state.players[playerIndex].status.forEach(x => {
    if (!Utils.equalsAny(skill.phase, SkillPhase.petAttack, SkillPhase.onPetBlock, SkillPhase.onDeath) && skill.name !== PetSkills.block.name) {
      triggerProbabilityMultiplier *= x.effect.triggerProbabilityMultiplier || 1;
    }
    if (x.effect.decreasePetBlockAndMovingIllusionPercent && Utils.equalsAny(skill.name, Skills.movingIllusion.name, PetSkills.block.name)) {
      triggerProbabilityMultiplier *= (100 - x.effect.decreasePetBlockAndMovingIllusionPercent) / 100;
    }
  });
  const probability = ((skill.triggerPercent + modifiedBaseFlatTriggerPercent) * triggerProbabilityMultiplier + hitFlatTriggerPercent) / 100;
  if (state.debug) state.log.push(`|debug|Probability Forecast: ${state.players[playerIndex].id} ${skill.name} ${probability.toFixed(2)}`);
  return probability
}

function tryToUseSkillFromPhase(state, playerIndex, phase) {
  const skill = Utils.randomElement(getAllSkillsEligibleToBeUsed(state, playerIndex, phase));
  if (skill) {
    return useSkill(state, playerIndex, skill);
  } else if (phase === SkillPhase.duringYourAttack) {
    return useSkill(state, playerIndex, Skills.normal);
  }
  return false;
}

function consumeSp(state, playerIndex, skill) {
  if (skill.spConsumption > 0) {
    let spConsumptionMultiplier = 1;
    state.players[playerIndex].status.forEach(x => spConsumptionMultiplier *= x.effect.spConsumptionMultiplier || 1);
    updateStat(state, playerIndex, Stats.sp.name, false, -skill.spConsumption * spConsumptionMultiplier, "skill cost");
    state.players[playerIndex].status.filter(x => x.removeWhenSpConsumed)
      .forEach(x => removeStatus(state, playerIndex, x.name));
  }
}

function useSkill(state, playerIndex, skill) {
  if (state.someoneDied) return;
  state.log.push(`|skill|${state.players[playerIndex].id}|${skill.name}`);
  consumeSp(state, playerIndex, skill);
  if (skill.maxTriggerTimes) {
    --skill.remainingUses;
  }
  if (skill.canBeThrownBack) {
    const throwbackProbability = skill.throwbackPercentPerTenSeconds * Math.floor(state.timer / 10000) / 100;
    const min = skill.minThrowbackPercent / 100;
    const max = skill.maxThrowbackPercent / 100;
    if (state.debug) console.log(`|debug|time: ${state.timer / 1000}s, throwback: ${Utils.clamp(throwbackProbability, min, max)}`);
    if (Utils.testProbability(Utils.clamp(throwbackProbability, min, max))) {
      const newSkill = Utils.deepClone(skill);
      newSkill.name += " Throwback";
      newSkill.canBeThrownBack = false;
      if (useSkill(state, playerIndex ^ 1, newSkill)) {
        tryToUseSkillFromPhase(state, playerIndex, SkillPhase.duringEnemyAttack);
      }
      return false;
    }
  }
  let damage = 0;
  let preventHealing = false;
  let attackedSkill;
  if ((skill.damage || skill.effect.target === SkillTarget.enemy) && !skill.undodgeable) {
    // mi, esw, pet block
    const eligibleAttackedSkills = getAllSkillsEligibleToBeUsed(state, playerIndex ^ 1, SkillPhase.duringAllEnemyAttacks)
      .filter(x => x.effect.damageTakenMultiplier ? skill.damage : true);
    attackedSkill = Utils.randomElement(eligibleAttackedSkills);
    if (attackedSkill) {
      state.log.push(`|skill|${state.players[playerIndex ^ 1].id}|${attackedSkill.name}`);
      consumeSp(state, playerIndex ^ 1, attackedSkill);
      if (attackedSkill.effect.dodgeAttack) {
        return false;
      }
      if (attackedSkill.effect.blockAttack) {
        tryToUseSkillFromPhase(state, playerIndex ^ 1, SkillPhase.onPetBlock);
        return false;
      }
    }
    const skipActions = state.players[playerIndex ^ 1].status.some(x => x.effect.skipActions);
    if (!skipActions && evaTest(state, playerIndex ^ 1)) {
      state.log.push(`|dodge|${state.players[playerIndex ^ 1].id}`);
      return false;
    }
  }
  if (skill.damage) [damage, preventHealing] = handleSkillDamage(state, playerIndex, skill, attackedSkill);
  if (skill.effect) handlePreFurySkillEffects(state, playerIndex, skill);
  if (skill.damage) gainFury(state, playerIndex ^ 1);
  if (skill.effect) handlePostFurySkillEffects(state, playerIndex, skill, damage, preventHealing);
  if (skill.secondaryEffect) handleSecondaryEffects(state, playerIndex, skill);
  if (skill.damage && state.players[playerIndex ^ 1].stats.current.hp <= 0) {
    if (!tryToUseSkillFromPhase(state, playerIndex ^ 1, SkillPhase.onDeath)) {
      state.someoneDied = true;
    }
  }
  if (skill.effect) handlePostOnDeathSkillEffects(state, playerIndex, skill, damage, preventHealing);
  return true;
}

function handleSkillDamage(state, playerIndex, skill, attackedSkill) {
  let options = {
    atkMultiplier: skill.damage.atkMultiplier,
    enemyMaxHpMultiplier: skill.damage.enemyMaxHpMultiplier,
  };
  // stored atk multiplier from fast move
  if (state.players[playerIndex].atkMultiplierForNextAttack) {
    options.atkMultiplier *= state.players[playerIndex].atkMultiplierForNextAttack;
    delete state.players[playerIndex].atkMultiplierForNextAttack;
  }
  options.atkMultiplier *= getAtkMultiplierFromStatusEffects(state, playerIndex);
  let damage = calculateDamage(state, playerIndex, options);
  const playerCrt = state.players[playerIndex].stats.current.crt;
  const enemyRes = state.players[playerIndex ^ 1].stats.current.res;
  let isCrt = false;
  if (crtTest(playerCrt, enemyRes)) {
    isCrt = true;
    damage *= 2 + ((playerCrt - enemyRes) * (1 / 500));
  }
  if (parryTest(enemyRes)) {
    state.log.push(`|parry|${state.players[playerIndex ^ 1].id}`);
    damage *= 0.5;
  }
  state.players[playerIndex ^ 1].status.forEach(x => {
    if (x.effect.damageTakenMultiplier) damage *= x.effect.damageTakenMultiplier;
    if (x.effect.fireDamageTakenMultiplier && skill.type === SkillType.fire.name) damage *= x.effect.fireDamageTakenMultiplier;
  });
  damage = Math.floor(damage);
  let damageTakenMultiplier = 1;
  if (attackedSkill?.effect.damageTakenMultiplier) {
    damageTakenMultiplier = attackedSkill.effect.damageTakenMultiplier;
  }
  if (attackedSkill?.effect.reflectRemainingDamage) {
    const damageToBeReflected = damage - Math.floor(damage * damageTakenMultiplier);
    dealDamage(state, playerIndex, damageToBeReflected, {
      source: attackedSkill.name,
      type: DamageType.other,
      skipOnDeath: state.players[playerIndex ^ 1].status.some(x => x.effect.percentDamageReflectedWhenAttacked)
    });
  }
  damage = Math.floor(damage * damageTakenMultiplier);
  let preventHealing = dealDamage(state, playerIndex ^ 1, damage, {
    source: skill.name,
    type: DamageType.attack,
    isFire: skill.type === SkillType.fire.name,
    skipOnDeath: true,
    skipFury: true,
    isCrt
  });
  handleWhenAttackedStatusEffects(state, playerIndex ^ 1, damage, skill);
  handleOnHitStatusEffects(state, playerIndex, damage, preventHealing);
  if (skill.phase === SkillPhase.duringYourAttack || skill.phase === SkillPhase.afterYourAttack) {
    tryToUseSkillFromPhase(state, playerIndex, SkillPhase.afterAttacking);
  }
  return [damage, preventHealing];
}

function handlePreFurySkillEffects(state, playerIndex, skill) {
  if (skill.effect.status && !skill.effect.applyAfterFury) {
    let targetIndices = [];
    if (skill.effect.target === SkillTarget.both) {
      targetIndices = [0, 1];
    } else {
      targetIndices.push(skill.effect.target ^ playerIndex);
    }
    targetIndices.forEach(index => addStatus(state, index, skill.effect.status, {
      expertise: skill.useExpertiseEffect,
      effectIncrease: skill.effectIncrease
    }));
  }
}

function handlePostFurySkillEffects(state, playerIndex, skill, damage, preventHealing) {
  if (skill.effect.status && skill.effect.applyAfterFury) {
    let targetIndices = [];
    if (skill.effect.target === SkillTarget.both) {
      targetIndices = [0, 1];
    } else {
      targetIndices.push(skill.effect.target ^ playerIndex);
    }
    targetIndices.forEach(index => addStatus(state, index, skill.effect.status, {
      expertise: skill.useExpertiseEffect,
      effectIncrease: skill.effectIncrease
    }));
  }
  if (skill.effect.removeThunderGod) {
    removeStatus(state, playerIndex, Status.thunderGod.name);
  }
  if (skill.effect.removeRandomDebuff) {
    removeRandomDebuff(state, playerIndex);
  }
  if (skill.effect.restartTurnAfterNextAttack) {
    state.players[playerIndex].restartTurnAfterNextAttack = true;
  }
  if (skill.effect.atkMultiplierForNextAttack) {
    state.players[playerIndex].atkMultiplierForNextAttack = skill.effect.atkMultiplierForNextAttack;
  }
  if (skill.effect.increaseSpd) {
    updateStat(state, playerIndex, Stats.spd.name, true, skill.effect.increaseSpd, skill.name);
  }
  if (skill.effect.percentDamageHealedOnHit && state.players[playerIndex].stats.current.hp > 0) {
    const healAmount = preventHealing ? 0 : Math.floor(damage * skill.effect.percentDamageHealedOnHit / 100);
    updateStat(state, playerIndex, Stats.hp.name, true, healAmount, skill.name);
  }
  if (skill.effect.removeEnemySpByYourSpPercent) {
    const spToRemove = Math.floor(state.players[playerIndex].stats.initial.sp * skill.effect.removeEnemySpByYourSpPercent / 100);
    let spConsumptionMultiplier = 1;
    state.players[playerIndex].status.forEach(x => spConsumptionMultiplier *= x.effect.spConsumptionMultiplier || 1);
    updateStat(state, playerIndex ^ 1, Stats.sp.name, false, -spToRemove, skill.name);
  }
  if (skill.effect.removeEnemySpByEnemySpPercent) {
    const spToRemove = Math.floor(state.players[playerIndex ^ 1].stats.initial.sp * skill.effect.removeEnemySpByEnemySpPercent / 100);
    updateStat(state, playerIndex ^ 1, Stats.sp.name, false, -spToRemove, skill.name);
  }
  if (skill.effect.gainPercentHp) {
    updateStat(state, playerIndex, Stats.hp.name, true, Math.floor(state.players[playerIndex].stats.initial.hp * skill.effect.gainPercentHp / 100), skill.name);
  }
  if (skill.effect.gainPercentSp) {
    updateStat(state, playerIndex, Stats.sp.name, true, Math.floor(state.players[playerIndex].stats.initial.sp * skill.effect.gainPercentSp / 100), skill.name);
  }
  if (skill.effect.removePoison) {
    removeStatus(state, playerIndex, Status.poisoned.name);
  }
  if (skill.effect.resetTriggerTimes) {
    const skillToReset = state.players[playerIndex].skills.find(x => x.name === skill.effect.resetTriggerTimes);
    if (skillToReset) {
      skillToReset.remainingUses = skillToReset.maxTriggerTimes;
    }
  }
  if (skill.effect.removeAllDebuffs) {
    getDebuffs(state, playerIndex).forEach(x => removeStatus(state, playerIndex, x.name));
  }
  if (skill.effect.increaseTriggerPercent) {
    const skillToIncrease = state.players[playerIndex].skills.find(x => x.name === skill.effect.increaseTriggerPercent);
    if (skillToIncrease) {
      skillToIncrease.triggerProbability += skill.effect.increaseTriggerPercentAmount / 100;
    }
  }
}

function handleSecondaryEffects(state, playerIndex, skill) {
  if (skill.secondaryEffect.status) {
    let targetIndices = [];
    if (skill.secondaryEffect.target === SkillTarget.both) {
      targetIndices = [0, 1];
    } else {
      targetIndices.push(skill.secondaryEffect.target ^ playerIndex);
    }
    targetIndices.forEach(index => addStatus(state, index, skill.secondaryEffect.status, {
      expertise: skill.useExpertiseEffect,
      effectIncrease: skill.effectIncrease
    }));
  }
}

function handlePostOnDeathSkillEffects(state, playerIndex, skill) {
  if (skill.effect.combosWithBloodFrenzy) {
    // call recursively while probabilty check passes
    if (state.players[playerIndex].status.some(status => status.name === Status.bloodFrenzy.name)) {
      const comboProbability = getSkillTriggerProbability(state, playerIndex, skill);
      if (Utils.testProbability(comboProbability)) useSkill(state, playerIndex, skill);
    }
  }
}

function getAtkMultiplierFromStatusEffects(state, playerIndex) {
  let atkMultiplier = 1;
  state.players[playerIndex].status.forEach(x => {
    if (x.effect.atkMultiplierPerHpPercentLost) {
      const maxHp = state.players[playerIndex].stats.initial.hp;
      const curHp = state.players[playerIndex].stats.current.hp;
      const percentHpLost = Math.floor((maxHp - curHp) * 100 / maxHp);
      atkMultiplier *= 1 + percentHpLost * x.effect.atkMultiplierPerHpPercentLost;
    }
    atkMultiplier *= x.effect.atkMultiplier || 1;
  });
  return atkMultiplier;
}

function addStatus(state, playerIndex, name, options = {}) {
  const existingStatus = state.players[playerIndex].status.find(x => x.name === name);
  if (existingStatus) {
    if (existingStatus.stackable) {
      // add stack to existing status
      existingStatus.stacks += 1;
      state.log.push(`|info|${state.players[playerIndex].id}: gained a stack of ${name}, total: ${existingStatus.stacks}`);
      createStatus(state, playerIndex, name, options);
      return;
    } else {
      removeStatus(state, playerIndex, name);
    }
  }
  state.log.push(`|status|add|${state.players[playerIndex].id}|${name}`);
  state.players[playerIndex].status.push(createStatus(state, playerIndex, name, options));
}

function createStatus(state, playerIndex, name, options) {
  const baseStatus = CFDB.getStatusEffect(name);
  let status = Utils.deepClone(baseStatus);
  if (options.expertise) {
    status.getExpertiseVersion = baseStatus.getExpertiseVersion;
    status.getExpertiseVersion();
  }
  if (options.effectIncrease) {
    if (status.effect.triggerPercent) {
      status.effect.triggerPercent += options.effectIncrease;
    }
    if (status.effect.decreaseStatusDuration) {
      status.effect.decreaseStatusDuration += options.effectIncrease;
      status.effect.statusDurationMultiplier = (100 - status.effect.decreaseStatusDuration) / 100;
    }
    if (status.effect.decreasePetBlockAndMovingIllusionPercent) {
      status.effect.decreasePetBlockAndMovingIllusionPercent += options.effectIncrease;
    }
  }
  if (status.stackable) {
    status.stacks = 1;
  }
  if (status.effect.removeIgnitedOnInflict) {
    removeStatus(state, playerIndex, Status.ignited.name);
  }
  if (status.effect.percentHpShield) {
    status.hpShield = Math.floor(state.players[playerIndex].stats.initial.hp * status.effect.percentHpShield / 100);
  }
  if (status.effect.storeDamageTaken) {
    status.storedDamage = 0;
  }
  if (status.effect.betrayalPercentPerTenSeconds) {
    status.betrayalPercent = 0;
  }
  if (status.effect.increaseCrt) {
    updateStat(state, playerIndex, Stats.crt.name, true, status.effect.increaseCrt, name);
  }
  if (status.effect.decreaseCrt) {
    updateStat(state, playerIndex, Stats.crt.name, false, -status.effect.decreaseCrt, name);
  }
  if (status.effect.decreaseEva) {
    updateStat(state, playerIndex, Stats.eva.name, false, -status.effect.decreaseEva, name);
  }
  if (status.effect.decreaseHit) {
    updateStat(state, playerIndex, Stats.hit.name, false, -status.effect.decreaseEva, name);
  }
  if (status.effect.decreaseBrk) {
    updateStat(state, playerIndex, Stats.brk.name, false, -status.effect.decreaseBrk, name);
  }
  if (status.effect.decreaseDef) {
    updateStat(state, playerIndex, Stats.def.name, false, -status.effect.decreaseDef, name);
  }
  if (status.removeAfterDuration) {
    let statusDuration = status.removeAfterDuration;
    state.players[playerIndex].status.filter(x => x.effect.statusDurationMultiplier)
      .forEach(x => statusDuration *= x.effect.statusDurationMultiplier);
    if (status.type === StatusType.debuff) {
      state.players[playerIndex].status.filter(x => x.effect.debuffDurationMultiplier)
        .forEach(x => statusDuration *= x.effect.debuffDurationMultiplier);
    }
    status.timeRemaining = statusDuration;
  }
  if (status.removeAfterTurns) {
    status.turnsRemaining = status.removeAfterTurns;
  }
  return status;
}

function removeStatus(state, playerIndex, name) {
  const indexOfStatus = state.players[playerIndex].status.findIndex(x => x.name === name);
  if (indexOfStatus >= 0) {
    const [removedStatus] = state.players[playerIndex].status.splice(indexOfStatus, 1);
    if (removedStatus.effect.increaseCrt) {
      updateStat(state, playerIndex, Stats.crt.name, false, -removedStatus.effect.increaseCrt, removedStatus.name);
    }
    state.log.push(`|status|remove|${state.players[playerIndex].id}|${name}`);
  }
}

function handleStartOfTurnStatusEffects(state, playerIndex) {
  state.players[playerIndex].status.forEach(x => {
    if (x.removeAfterTurns) {
      x.turnsRemaining -= 1;
      if (x.turnsRemaining <= 0) {
        removeStatus(state, playerIndex, x.name);
      }
    }
    if (x.effect.percentHpTakenAtTurnStart) {
      dealDamage(state, playerIndex, Math.floor(state.players[playerIndex].stats.initial.hp * x.effect.percentHpTakenAtTurnStart / 100), {
        source: x.name,
        type: DamageType.dot
      });
    }
    if (x.effect.spTakenAtTurnStart) {
      updateStat(state, playerIndex, Stats.sp.name, false, -x.effect.spTakenAtTurnStart, x.name);
    }
    if (x.removeOnTurnStart) {
      removeStatus(state, playerIndex, x.name);
    }
  });
}

function handleTimerRelatedStatusEffects(state) {
  state.players.forEach(player => player.status.forEach(status => {
    if (status.removeAfterDuration) {
      status.timeRemaining -= 100;
      if (status.timeRemaining <= 0) {
        if (status.effect.takeStoredDamageAfterDuration) {
          dealDamage(state, player.index, status.storedDamage, {
            source: status.name,
            type: DamageType.other
          })
        }
        removeStatus(state, player.index, status.name);
      }
    }
    if (state.timer > 0 && (state.timer % 10000) === 0) {
      if (status.effect.crtIncreasePerTenSeconds) {
        updateStat(state, player.index, Stats.crt.name, true, status.effect.crtIncreasePerTenSeconds, status.name);
      }
      if (status.effect.betrayalPercentPerTenSeconds) {
        status.betrayalPercent = Math.min(status.betrayalPercent + status.effect.betrayalPercentPerTenSeconds, status.effect.maxBetrayalPercent);
      }
    }
  }));
}

function handleStatusBetrayal(state) {
  let betrayed = [];
  state.players.forEach(player => player.status.forEach(x => {
    if (!betrayed.includes(x.name) && x.betrayalPercent && Utils.testProbability(x.betrayalPercent / 100)) {
      state.log.push("|info|Top 10 anime betrayals");
      removeStatus(state, player.index, x.name);
      state.players[player.index ^ 1].status.push(x);
      state.log.push(`|status|add|${state.players[player.index ^ 1].id}|${x.name}`);
      betrayed.push(x.name);
    }
  }));
}

function handleWhenAttackedStatusEffects(state, playerIndex, damage, skill) {
  state.players[playerIndex].status.forEach(x => {
    if (x.effect.percentDamageReflectedWhenAttacked) {
      dealDamage(state, playerIndex ^ 1, Math.floor(damage * x.effect.percentDamageReflectedWhenAttacked / 100), {
        source: x.name,
        type: DamageType.other
      });
    }
    if (x.effect.igniteWhenHitByFire && skill.type === SkillType.fire.name) {
      addStatus(state, playerIndex, Status.ignited.name);
    }
    if (x.removeWhenAttacked) {
      if (!(x.effect.immuneToFireDamage && skill.type === SkillType.fire.name)) {
        removeStatus(state, playerIndex, x.name);
      }
    }
  });
}

function handleOnHitStatusEffects(state, playerIndex, damage, preventHealing) {
  state.players[playerIndex].status.forEach(x => {
    if (x.effect.percentDamageHealedOnHit && state.players[playerIndex].stats.current.hp > 0) {
      updateStat(state, playerIndex, Stats.hp.name, true, preventHealing ? 0 : Math.floor(damage * x.effect.percentDamageHealedOnHit / 100), x.name);
    }
    if (x.effect.percentHpLostOnHit) {
      dealDamage(state, playerIndex, Math.floor(damage * x.effect.percentHpLostOnHit / 100), {
        source: x.name,
        type: DamageType.other
      });
    }
    if (x.effect.spStolenOnHit) {
      const amount = Math.min(x.effect.spStolenOnHit, state.players[playerIndex ^ 1].stats.current.sp);
      updateStat(state, playerIndex ^ 1, Stats.sp.name, false, -amount, x.name);
      updateStat(state, playerIndex, Stats.sp.name, true, amount, x.name);
    }
    if (x.effect.applyWoundedOnHit) {
      addStatus(state, playerIndex ^ 1, Status.wounded.name, { expertise: x.effect.expertWounded });
    }
    if (x.effect.gainFuryOnHit) {
      if (Utils.testProbability(x.effect.triggerPercent / 100)) {
        gainFury(state, playerIndex, x.effect.gainFuryOnHit);
      }
    }
  });
}

function dealDamage(state, playerIndex, amount, options) {
  let preventHealing = false;
  state.players[playerIndex].status.forEach(x => {
    if (options.type === DamageType.attack && x.effect.immuneToAttackDamage
      || options.type === DamageType.other && x.effect.immuneToOtherDamage
      || options.source === Status.thunderGod.name && x.effect.immuneToThunderGod
      || options.isFire && x.effect.immuneToFireDamage) {
      amount = 0;
      state.log.push(`|info|${state.players[playerIndex].id}: prevented damage due to ${x.name}`);
    }
  })
  const statusWithHpShield = state.players[playerIndex].status.find(x => x.hpShield);
  if (statusWithHpShield) {
    if (statusWithHpShield.hpShield > amount) {
      if (amount > 0) {
        statusWithHpShield.hpShield -= amount;
        state.log.push(`|info|${state.players[playerIndex].id}: ${statusWithHpShield.name} absorbs ${amount} damage`);
        amount = 0;
        preventHealing = statusWithHpShield.effect.preventHealingWhenDamageAbsorbed;
      }
    } else {
      amount -= statusWithHpShield.hpShield;
      state.log.push(`|info|${state.players[playerIndex].id}: ${statusWithHpShield.name} absorbs ${statusWithHpShield.hpShield} damage`);
      removeStatus(state, playerIndex, statusWithHpShield.name);
    }
  }
  state.players[playerIndex].status.filter(x => x.effect.storeDamageTaken).forEach(x => x.storedDamage += amount);
  updateStat(state, playerIndex, Stats.hp.name, false, -amount, options.source, options.isCrt);
  if (!options.skipFury) {
    gainFury(state, playerIndex);
  }
  if (!options.skipOnDeath) {
    if (state.players[playerIndex].stats.current.hp <= 0) {
      if (!tryToUseSkillFromPhase(state, playerIndex, SkillPhase.onDeath)) {
        state.someoneDied = true;
      }
    }
  }
  return preventHealing;
}

function updateStat(state, playerIndex, stat, add, amount, source, isCrt) {
  const stats = state.players[playerIndex].stats;
  stats.current[stat] += amount;
  stats.current[stat] = Math.max(0, stats.current[stat]);
  if (stat === Stats.hp.name || stat === Stats.sp.name) {
    stats.current[stat] = Math.min(stats.current[stat], stats.initial[stat]);
  }
  if (isCrt) state.log.push("|info|It's a critical hit!");
  state.log.push(`|stat|${add ? "add" : "remove"}|${state.players[playerIndex].id}|${stat}|${amount}|${stats.current[stat]}|${stats.initial[stat]}|${source}|${isCrt ? "crt" : "noCrt"}`);
}

function gainFury(state, playerIndex, overrideAmount) {
  const furyPoints = overrideAmount || state.players[playerIndex].stats.current.furyReversion;
  state.players[playerIndex].fury += furyPoints;
  if (state.players[playerIndex].fury > FURY_BURST_THRESHOLD) state.players[playerIndex].fury = FURY_BURST_THRESHOLD;
  state.log.push(`|fury|${state.players[playerIndex].id}|${furyPoints}|${state.players[playerIndex].fury}`);
  if (state.players[playerIndex].fury >= FURY_BURST_THRESHOLD) {
    if (getDebuffs(state, playerIndex).length > 0) {
      state.players[playerIndex].furyBursts += 1;
      state.log.push(`|furyburst|${state.players[playerIndex].id}`);
      removeRandomDebuff(state, playerIndex);
      getAllSkillsEligibleToBeUsed(state, playerIndex, SkillPhase.onFuryBurst).forEach(skill => useSkill(state, playerIndex, skill));
      state.players[playerIndex].fury = 0;
    }
  }
}

function getPlayersEligibleToTakeTurn(state) {
  if (state.timer === 0) return [];
  return state.players.filter(player => {
    let spdMultiplier = 1;
    player.status.forEach(x => spdMultiplier *= x.effect.spdMultiplier || 1);
    return (state.timer % getSecondsPerAttack(player.stats.current.spd)) === 0;
  });
}

function getSecondsPerAttack(spd) {
  return Math.ceil(10000 / spd) * 100;
}

function areActiveSkillsDisabled(state, playerIndex, phase) {
  return (Utils.equalsAny(phase, SkillPhase.beforeYourAttack, SkillPhase.duringYourAttack, SkillPhase.afterYourAttack))
    && state.players[playerIndex].status.some(x => x.effect.disableActiveSkills);
}

function getDebuffs(state, playerIndex) {
  return state.players[playerIndex].status.filter(x => x.type === StatusType.debuff);
}

function removeRandomDebuff(state, playerIndex) {
  const debuffs = getDebuffs(state, playerIndex);
  if (debuffs.length > 0) {
    const randomDebuff = Utils.randomElement(debuffs).name;
    removeStatus(state, playerIndex, randomDebuff);
  }
}

function isThunderGodActive(state) {
  return state.players.some(player => player.status.some(status => status.name === Status.thunderGod.name));
}

function isFullHp(state, playerIndex) {
  return state.players[playerIndex].stats.initial.hp === state.players[playerIndex].stats.current.hp;
}

function isHpNotFullOrPoisoned(state, playerIndex) {
  return !isFullHp(state, playerIndex) || state.players[playerIndex].status.some(status => status.name === Status.poisoned.name);
}

function evaTest(state, playerIndex) {
  let evaMultiplier = 1;
  state.players[playerIndex].status.forEach(x => evaMultiplier *= x.effect.evaMultiplier || 1);
  const eva = state.players[playerIndex].stats.current.eva * evaMultiplier;
  const hit = state.players[playerIndex ^ 1].stats.current.hit;
  if (hit > eva) return false;
  const probability = (eva - hit) * DODGE_PERCENT_PER_EVA / 100;
  if (state.debug) state.log.push(`|debug|EVA Forecast: EVA=${eva} HIT=${hit} probability=${probability.toFixed(2)}`);
  return Utils.testProbability(probability);
}

function crtTest(crt, res) {
  return Utils.testProbability((crt - res) * CRIT_PERCENT_PER_CRT / 100);
}

function parryTest(res) {
  return Utils.testProbability(res * PARRY_PERCENT_PER_RES / 100);
}

function calculateDamage(state, atatckerIndex, options) {
  const attackerStats = state.players[atatckerIndex].stats.current;
  const defenderStats = state.players[atatckerIndex ^ 1].stats.current;
  const atk = Utils.randomIntInclusive(attackerStats.minAtk, attackerStats.maxAtk);
  const baseMultiplier = defenderStats.def > attackerStats.brk
    ? (1 / (1 + (defenderStats.def - attackerStats.brk) * (1 / 1500)))
    : (1 + ((attackerStats.brk - defenderStats.def) * (1 / 500)));
  let flatDamage = options.enemyMaxHpMultiplier || 0;
  state.players[atatckerIndex ^ 1].status.filter(x => x.effect.damageTakenPerStack)
    .forEach(x => flatDamage += x.effect.damageTakenPerStack * x.stacks);
  return Math.floor(atk * baseMultiplier * options.atkMultiplier) + flatDamage;
}
