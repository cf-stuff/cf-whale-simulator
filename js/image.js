export const ImageType = {
  arena: "arena",
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
  skillSlot: "skillSlot",
  totem: "totem",
  bg: "bg",
  replayBtn: "replayBtn"
}

export const getImagePath = (type, id, intVersion = false) => {
  const basePath = "img/";
  switch (type) {
    case ImageType.arena:
      return basePath + `arena/r-${id}.png`;
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
    case ImageType.skillSlot:
      return basePath + `skill/${id}.png`;
    case ImageType.totem:
      return basePath + `totems/tuten${id}.png`;
    case ImageType.bg:
      return basePath + `display/background${id}.png`;
    case ImageType.replayBtn:
      return basePath + `display/buttons/${id}.png`;
  }
}

const imageMap = new Map();

export async function getImageAsync(path) {
  if (imageMap.has(path)) imageMap.get(path);
  const image = new Image();
  image.src = path;
  imageMap.set(path, image);
  return new Promise(resolve => image.onload = () => resolve(image));
}

export function getImage(path) {
  if (imageMap.has(path)) return imageMap.get(path);
  const image = new Image();
  image.src = path;
  imageMap.set(path, image);
  return image;
}
