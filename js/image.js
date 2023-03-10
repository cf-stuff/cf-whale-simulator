export const ImageType = {
  fighter: "fighter",
  fighterSkill: "fighterSkill",
  gear: "gear",
  gearType: "gearType",
  glyph: "glyph",
  item: "item",
  pet: "pet",
  petSkill: "petSkill",
  skill: "skill",
  skillType: "skillType",
  totem: "totem"
}

export const getImagePath = (type, id, intVersion = false) => {
  const basePath = "img/";
  switch (type) {
    case ImageType.fighter:
      return basePath + `coatIcon/coat_icon_${id}.png`;
    case ImageType.fighterSkill:
      return basePath + `coatSkillIcon/coatskill_icon${id}.png`;
    case ImageType.gear:
      return basePath + `equipIcon/equ_icon_${id}.png`;
    case ImageType.gearType:
      return basePath + `itemPlaceholder/icon${id}.png`;
    case ImageType.glyph:
      return basePath + `glyphsIcon/item_icon_${id}.png`;
    case ImageType.item:
      return basePath + `itemIcon/item_icon_${id}.png`;
    case ImageType.pet:
      return basePath + `petIcon/pet_icon_${id}.png`;
    case ImageType.petSkill:
      return basePath + `${intVersion ? "int/" : ""}petskillIcon/petskill_icon_${id}.png`;
    case ImageType.skill:
      return basePath + `skillIcon/skillIcon${id}.png`;
    case ImageType.skillType:
      return basePath + `skillSet/skillSet${id}.png`;
    case ImageType.totem:
      return basePath + `totems/tuten${id}.png`;
  }
}

export const preload = url => new Image().src = url;
