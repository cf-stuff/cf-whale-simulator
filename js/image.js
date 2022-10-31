export const ImageType = {
  fighter: 0,
  fighterSkill: 1,
  gear: 2,
  glyph: 3,
  item: 4,
  pet: 5,
  petSkill: 6,
  skill: 7,
  skillType: 8,
  totem: 9
}

export default function getImagePath(type, id) {
  const basePath = "img/";
  switch (type) {
    case ImageType.fighter:
      return basePath + `coatIcon/coat_icon_${id}.png`;
    case ImageType.fighterSkill:
      return basePath + `coatSkillIcon/coatskill_icon${id}.png`;
    case ImageType.gear:
      return basePath + `iquipIcon/equ_icon_${id}.png`;
    case ImageType.glyph:
      return basePath + `glyphsIcon/item_icon_${id}.png`;
    case ImageType.item:
      return basePath + `itemIcon/item_icon_${id}.png`;
    case ImageType.pet:
      return basePath + `petIcon/pet_icon_${id}.png`;
    case ImageType.petSkill:
      return basePath + `petskillIcon/petskill_icon_${id}.png`;
    case ImageType.skill:
      return basePath + `skillIcon/skillIcon${id}.png`;
    case ImageType.skillType:
      return basePath + `skillSet/skillSet${id}.png`;
    case ImageType.totem:
      return basePath + `totems/tuten${id}.png`;
  }
}
