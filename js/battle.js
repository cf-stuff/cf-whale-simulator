import { FURY_BURST_THRESHOLD, BATTLE_TIME_LIMIT_MS } from "./config.js";
import { DamageType, SkillPhase, SkillTarget, SkillType, StatusType } from "./data/categories.js";
import CFDB from "./data/CFDB.js";
import PetSkills from "./data/petSkills.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Status from "./data/status.js";
import Utils from "./utils.js";

export function simulateBattle(left, right) {
  const leftPlayers = left.map(player => createPlayerForBattle(player, 0));
  const rightPlayers = right.map(player => createPlayerForBattle(player, 1));
  leftPlayers.forEach((player, i) => player.id = i * 2);
  rightPlayers.forEach((player, i) => player.id = i * 2 + 1);
  const logs = [];
  logs.push(`left: ${leftPlayers.map(player => `${player.name}=${player.id}`)}`);
  logs.push(`right: ${rightPlayers.map(player => `${player.name}=${player.id}`)}`);
  let currentIndex = [0, 0];
  while (currentIndex[0] < left.length && currentIndex[1] < right.length) {
    let state = {
      players: [leftPlayers[currentIndex[0]], rightPlayers[currentIndex[1]]],
      timer: 0,
      isGameOver: false,
      log:[]
    }
    // before round cleanup
    applyExpertiseAndMasteryToSkills(state);
    state.players.forEach(player => player.status = []);
    startBattle(state);
    state.players.forEach(player => {
      if (player.stats.current.hp <= 0) {
        ++currentIndex[player.index];
      }
    });
    console.log(state);
    logs.push(...state.log);
  }
  return logs;
}

function createPlayerForBattle(player, index) {
  return {
    name: player.name,
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

function applyExpertiseAndMasteryToSkills(state) {
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
  state.log.push(`${state.players[0].id} vs ${state.players[1].id}`);
  state.players.forEach(player => getAllSkillsEligibleToBeUsed(state, player.index, SkillPhase.beforeFight)
    .forEach(skill => useSkill(state, player.index, skill)));
  // start game timer, measured in ms mainly to avoid decimals
  while (state.timer < BATTLE_TIME_LIMIT_MS) {
    if (state.isGameOver) break;
    // e.g. 715 spd = 1.4s/attack = 1400ms/attack
    // so should attack whenever timer is at 1400, 2800, etc
    getPlayersEligibleToTakeTurn(state).forEach(player => {
      if (state.isGameOver) return;
      state.players.forEach(player => {
        if (getDebuffs(state, player.index).length > 0) {
          tryToUseSkillFromPhase(state, player.index, SkillPhase.onDebuff);
        }
      });
      if (player.status.some(x => x.effect.skipTurn)) return;
      // turn start
      state.log.push(`${player.id}: turn start at ${state.timer / 1000} seconds`);
      // save here just in case it gets removed at start of turn
      const skipActions = player.status.some(x => x.effect.skipActions);
      handleStartOfTurnStatusEffects(state, player.index);
      handleStatusBetrayal(state);
      if (skipActions) return;
      do {
        delete player.restartTurnAfterNextAttack;
        tryToUseSkillFromPhase(state, player.index, SkillPhase.beforeYourAttack);
        tryToUseSkillFromPhase(state, player.index ^ 1, SkillPhase.beforeEnemyAttack);
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
  state.log.push(`${state.players[1].stats.current.hp > 0 ? state.players[1].id : state.players[0].id} wins`);
  // return state;
}

function getAllSkillsEligibleToBeUsed(state, playerIndex, phase) {
  return state.players[playerIndex].skills.filter(skill => skill.phase === phase)
    .filter(skill => skill.spConsumption ? state.players[playerIndex].stats.current.sp >= skill.spConsumption : true)
    .filter(skill => areActiveSkillsDisabled(state, playerIndex, phase) ? skill.bypassDisableActiveSkills : true)
    .filter(skill => skill.maxTriggerTimes ? skill.remainingUses > 0 : true)
    .filter(skill => skill.effect?.removeRandomDebuff ? getDebuffs(state, playerIndex).length > 0 : true)
    .filter(skill => skill.cantUseIfThunderGodIsActive ? !isThunderGodActive(state) : true)
    .filter(skill => skill.numberOfFuryBursts ? state.players[playerIndex].furyBursts % skill.numberOfFuryBursts === 0 : true)
    .filter(skill => Utils.testProbability(getSkillTriggerProbability(state, playerIndex, skill)));
}

function getSkillTriggerProbability(state, playerIndex, skill) {
  let flatTriggerPercent = 0;
  if (Utils.equalsAny(skill.phase, SkillPhase.beforeYourAttack, SkillPhase.duringYourAttack, SkillPhase.afterYourAttack, SkillPhase.beforeEnemyAttack)) {
    flatTriggerPercent += state.players[playerIndex].stats.current.hit * 0.01;
  }
  if (skill.effect.reduceTriggerPercentPerTenSeconds) {
    flatTriggerPercent -= Math.floor(state.timer / 10000) * skill.effect.reduceTriggerPercentPerTenSeconds;
  }
  let triggerProbabilityMultiplier = 1;
  state.players[playerIndex].status.forEach(x => {
    if (!Utils.equalsAny(skill.phase, SkillPhase.petAttack, SkillPhase.onPetBlock)) {
      triggerProbabilityMultiplier *= x.effect.triggerProbabilityMultiplier || 1;
    }
    if (x.effect.decreasePetBlockAndMovingIllusionPercent && Utils.equalsAny(skill.name, Skills.movingIllusion.name, PetSkills.block.name)) {
      triggerProbabilityMultiplier *= (100 - x.effect.decreasePetBlockAndMovingIllusionPercent) / 100;
    }
  });
  const probabilty = (skill.triggerPercent + flatTriggerPercent) * triggerProbabilityMultiplier / 100;
  if (state.debug) state.log.push(`[DEBUG] Probability forcast: ${state.players[playerIndex].id} ${skill.name} ${probabilty.toFixed(2)}`);
  return probabilty
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

function useSkill(state, playerIndex, skill) {
  if (state.isGameOver) return;
  state.log.push(`${state.players[playerIndex].id}: ${skill.name}`);
  if (skill.spConsumption > 0) {
    let spConsumptionMultiplier = 1;
    state.players[playerIndex].status.forEach(x => spConsumptionMultiplier *= x.effect.spConsumptionMultiplier || 1);
    updateStat(state, playerIndex, Stats.sp.name, -skill.spConsumption * spConsumptionMultiplier, "skill cost");
    state.players[playerIndex].status.filter(x => x.removeWhenSpConsumed)
      .forEach(x => removeStatus(state, playerIndex, x.name));
  }
  if (skill.maxTriggerTimes) {
    --skill.remainingUses;
  }
  let damage = 0;
  let attackedSkill;
  if ((skill.damage || skill.effect.target === SkillTarget.enemy) && !skill.undodgeable) {
    // mi, esw, pet block
    const eligibleAttackedSkills = getAllSkillsEligibleToBeUsed(state, playerIndex ^ 1, SkillPhase.duringAllEnemyAttacks)
      .filter(x => x.effect.damageTakenMultiplier ? skill.damage : true);
    attackedSkill = Utils.randomElement(eligibleAttackedSkills);
    if (attackedSkill) {
      state.log.push(`${state.players[playerIndex ^ 1].id}: ${attackedSkill.name}`);
      if (attackedSkill.effect.dodgeAttack) {
        return false;
      }
      if (attackedSkill.effect.blockAttack) {
        tryToUseSkillFromPhase(state, playerIndex ^ 1, SkillPhase.onPetBlock);
        return false;
      }
    }
    if (evaTest(state, playerIndex ^ 1)) {
      state.log.push(`${state.players[playerIndex ^ 1].id} evaded the hit`);
      return false;
    }
  }
  if (skill.damage) damage = handleSkillDamage(state, playerIndex, skill, attackedSkill);
  if (skill.effect) handleSkillEffects(state, playerIndex, skill, damage);
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
  if (crtTest(playerCrt, enemyRes)) {
    state.log.push("It's a critical hit!");
    damage *= 2 + ((playerCrt - enemyRes) * (1 / 500));
  }
  if (parryTest(enemyRes)) {
    state.log.push(`${state.players[playerIndex ^ 1].id}: parried the hit`);
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
      type: DamageType.other
    });
  }
  damage = Math.floor(damage * damageTakenMultiplier);
  handleWhenAttackedStatusEffects(state, playerIndex ^ 1, damage, skill);
  dealDamage(state, playerIndex ^ 1, damage, {
    source: skill.name,
    type: DamageType.attack,
    isFire: skill.type === SkillType.fire.name
  });
  handleOnHitStatusEffects(state, playerIndex, damage);
  if (skill.phase === SkillPhase.duringYourAttack || skill.phase === SkillPhase.afterYourAttack) {
    tryToUseSkillFromPhase(state, playerIndex, SkillPhase.afterAttacking);
  }
  return damage;
}

function handleSkillEffects(state, playerIndex, skill, damage) {
  if (skill.effect.removeThunderGod) {
    removeStatus(state, playerIndex, Status.thunderGod.name);
  }
  if (skill.effect.status) {
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
    updateStat(state, playerIndex, Stats.spd.name, skill.effect.increaseSpd, skill.name);
  }
  if (skill.effect.percentDamageHealedOnHit && state.players[playerIndex ^ 1].status.every(x => !x.effect.preventHealingWhenAttacked)) {
    const healAmount = Math.floor(damage * skill.effect.percentDamageHealedOnHit / 100);
    updateStat(state, playerIndex, Stats.hp.name, healAmount, skill.name);
  }
  if (skill.effect.removeEnemySpByYourSpPercent) {
    const spToRemove = Math.floor(state.players[playerIndex].stats.initial.sp * skill.effect.removeEnemySpByYourSpPercent / 100);
    updateStat(state, playerIndex ^ 1, Stats.sp.name, -spToRemove, skill.name);
  }
  if (skill.effect.removeEnemySpByEnemySpPercent) {
    const spToRemove = Math.floor(state.players[playerIndex ^ 1].stats.initial.sp * skill.effect.removeEnemySpByEnemySpPercent / 100);
    updateStat(state, playerIndex ^ 1, Stats.sp.name, -spToRemove, skill.name);
  }
  if (skill.effect.gainPercentHp) {
    updateStat(state, playerIndex, Stats.hp.name, Math.floor(state.players[playerIndex].stats.initial.hp * skill.effect.gainPercentHp / 100), skill.name);
  }
  if (skill.effect.gainPercentSp) {
    updateStat(state, playerIndex, Stats.sp.name, Math.floor(state.players[playerIndex].stats.initial.sp * skill.effect.gainPercentSp / 100), skill.name);
  }
  if (skill.effect.removePoison) {
    removeStatus(state, playerIndex, Status.poisoned.name);
  }
  if (skill.effect.combosWithBloodFrenzy) {
    // call recursively while probabilty check passes
    if (state.players[playerIndex].status.some(x => x.name === Status.bloodFrenzy.name)) {
      const comboProbability = getSkillTriggerProbability(state, playerIndex, skill);
      if (Utils.testProbability(comboProbability)) useSkill(state, playerIndex, skill);
    }
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

function addStatus(state, playerIndex, name, options) {
  const existingStatus = state.players[playerIndex].status.find(x => x.name === name);
  if (existingStatus) {
    if (existingStatus.stackable) {
      // add stack to existing status
      existingStatus.stacks += 1;
      state.log.push(`${state.players[playerIndex].id}: gained a stack of ${name}, total: ${existingStatus.stacks}`);
      return;
    } else {
      removeStatus(state, playerIndex, name);
    }
  }
  state.players[playerIndex].status.push(createStatus(state, playerIndex, name, options));
  state.log.push(`${state.players[playerIndex].id}: gained status ${name}`);
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
    state.players[playerIndex].stats.current.crt += status.effect.increaseCrt;
  }
  if (status.removeAfterDuration) {
    let statusDuration = status.removeAfterDuration;
    if (status.type === StatusType.debuff) {
      state.players[playerIndex].status.filter(x => x.effect.statusDurationMultiplier)
        .forEach(x => statusDuration *= x.effect.statusDurationMultiplier);
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
      state.players[playerIndex].stats.current.crt -= removedStatus.effect.increaseCrt;
    }
    state.log.push(`${state.players[playerIndex].id}: lost status ${name}`);
  }
}

function handleStartOfTurnStatusEffects(state, playerIndex) {
  state.players[playerIndex].status.forEach(x => {
    // decrement turn count
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
      updateStat(state, playerIndex, Stats.sp.name, -x.effect.spTakenAtTurnStart, x.name);
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
            souce: status.name,
            type: DamageType.other
          })
        }
        removeStatus(state, player.index, status.name);
      }
    }
    if (state.timer > 0 && (state.timer % 10000) === 0) {
      if (status.effect.crtIncreasePerTenSeconds) {
        updateStat(state, player.index, status.effect.crtIncreasePerTenSeconds, status.name);
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
      if (state.debug) state.log.push("[DEBUG] top 10 anime betrayals");
      removeStatus(state, player.index, x.name);
      state.players[player.index ^ 1].status.push(x);
      state.log.push(`${state.players[player.index ^ 1].id}: gained status ${x.name}`);
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

function handleOnHitStatusEffects(state, playerIndex, damage) {
  state.players[playerIndex].status.forEach(x => {
    if (x.effect.percentDamageHealedOnHit && state.players[playerIndex ^ 1].status.every(x => !x.effect.preventHealingWhenAttacked)) {
      updateStat(state, playerIndex, Stats.hp.name, Math.floor(damage * x.effect.percentDamageHealedOnHit / 100), x.name);
    }
    if (x.effect.percentHpLostOnHit) {
      dealDamage(state, playerIndex, Math.floor(damage * x.effect.percentHpLostOnHit / 100), {
        source: x.name,
        type: DamageType.other
      });
    }
    if (x.effect.spStolenOnHit) {
      const amount = Math.min(x.effect.spStolenOnHit, state.players[playerIndex ^ 1].stats.current.sp);
      updateStat(state, playerIndex ^ 1, Stats.sp.name, -amount, x.name);
      updateStat(state, playerIndex, Stats.sp.name, amount, x.name);
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
  state.players[playerIndex].status.forEach(x => {
    if (options.type === DamageType.attack && x.effect.immuneToAttackDamage) {
      amount = 0;
    } else if (options.type === DamageType.other && x.effect.immuneToOtherDamage) {
      amount = 0;
    } else if (options.source === Status.thunderGod.name && x.effect.immuneToThunderGod) {
      amount = 0;
    } else if (options.isFire && x.effect.immuneToFireDamage) {
      amount = 0;
    }
  })
  const statusWithHpShield = state.players[playerIndex].status.find(x => x.hpShield);
  if (statusWithHpShield) {
    if (statusWithHpShield.hpShield > amount) {
      statusWithHpShield.hpShield -= amount;
      state.log.push(`${state.players[playerIndex].id}: ${statusWithHpShield.name} absorbs ${amount} damage`);
      amount = 0;
    } else {
      amount -= statusWithHpShield.hpShield;
      state.log.push(`${state.players[playerIndex].id}: ${statusWithHpShield.name} absorbs ${statusWithHpShield.hpShield} damage`);
      removeStatus(state, playerIndex, statusWithHpShield.name);
    }
  }
  state.players[playerIndex].status.filter(x => x.effect.storeDamageTaken).forEach(x => x.damageTaken += amount);
  updateStat(state, playerIndex, Stats.hp.name, -amount, options.source);
  if (state.players[playerIndex].stats.current.hp <= 0) {
    if (!tryToUseSkillFromPhase(state, playerIndex, SkillPhase.onDeath)) {
      state.log.push("game over");
      state.isGameOver = true;
    }
  }
  gainFury(state, playerIndex);
}

function updateStat(state, playerIndex, stat, amount, source) {
  const stats = state.players[playerIndex].stats;
  stats.current[stat] += amount;
  if (stat === Stats.hp.name || stat === Stats.sp.name) {
    stats.current[stat] = Utils.clamp(stats.current[stat], 0, stats.initial[stat]);
  }
  state.log.push(`${state.players[playerIndex].id}: ${amount} ${stat} from ${source}, ${stats.current[stat]}/${stats.initial[stat]}`);
}

function gainFury(state, playerIndex, overrideAmount) {
  if (state.players[playerIndex].fury < FURY_BURST_THRESHOLD) {
    const furyPoints = overrideAmount || state.players[playerIndex].stats.current.furyReversion;
    state.players[playerIndex].fury += furyPoints;
    state.log.push(`${state.players[playerIndex].id}: gained ${furyPoints} fury, ${state.players[playerIndex].fury}/${FURY_BURST_THRESHOLD}`);
  }
  if (state.players[playerIndex].fury >= FURY_BURST_THRESHOLD) {
    if (getDebuffs(state, playerIndex).length > 0) {
      state.players[playerIndex].furyBursts += 1;
      state.log.push(`${state.players[playerIndex].id}: fury burst`);
      getAllSkillsEligibleToBeUsed(state, playerIndex, SkillPhase.onFuryBurst).forEach(skill => useSkill(state, playerIndex, skill));
      removeRandomDebuff(state, playerIndex);
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

function evaTest(state, playerIndex) {
  if (state.players[playerIndex ^ 1].stats.current.hit > state.players[playerIndex].stats.current.eva) return false;
  let evaMultiplier = 1;
  let hitMultiplier = 1;
  state.players[playerIndex].status.forEach(x => evaMultiplier *= x.effect.evaMultiplier || 1);
  state.players[playerIndex ^ 1].status.forEach(x => hitMultiplier *= x.effect.hitMultiplier || 1);
  return Utils.testProbability((state.players[playerIndex].stats.current.eva - state.players[playerIndex ^ 1].stats.current.hit) * 0.0006);
}

function crtTest(crt, res) {
  return Utils.testProbability((crt - res) * 0.0004);
}

function parryTest(res) {
  return Utils.testProbability(res * 0.0002);
}

function calculateDamage(state, atatckerIndex, options) {
  const attackerStats = state.players[atatckerIndex].stats.current;
  const defenderStats = state.players[atatckerIndex ^ 1].stats.current;
  const atk = Utils.getRandomIntInclusive(attackerStats.minAtk, attackerStats.maxAtk);
  const baseMultiplier = defenderStats.def > attackerStats.brk
    ? (1 / (1 + (defenderStats.def - attackerStats.brk) * (1 / 1500)))
    : (1 + ((attackerStats.brk - defenderStats.def) * (1 / 500)));
  let flatDamage = options.enemyMaxHpMultiplier || 0;
  state.players[atatckerIndex ^ 1].status.filter(x => x.effect.damageTakenPerStack)
    .forEach(x => flatDamage += x.effect.damageTakenPerStack * x.stacks);
  return Math.floor(atk * baseMultiplier * options.atkMultiplier) + flatDamage;
}
