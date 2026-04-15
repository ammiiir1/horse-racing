import type { IHorse } from '~/typescript/interfaces/app'

// ///////////////////////////////////////////////////// data
const horseNames = [
  'Thunderbolt',
  'ShadowFax',
  'Storm Chaser',
  'Midnight Runner',
  'Silver Arrow',
  'Blaze King',
  'Iron Hoof',
  'Wind Spirit',
  'Dust Rider',
  'Night Fury',
  'Golden Mane',
  'Rapid Fire',
  'Black Comet',
  'Sky Dancer',
  'Wild Spirit',
  'Red Horizon',
  'Blue Lightning',
  'Fast Whisper',
  'Dark Star',
  'Snow Storm',
  'Fire Hoof',
  'Moon Runner',
  'Desert Wind',
  'Crimson Bolt',
  'Silent Thunder',
  'Storm Breaker',
  'Frost Runner',
  'Golden Flash',
  'Night Shadow',
  'Iron Storm',
  'Wind Walker',
  'Thunder Strike',
  'Shadow Runner',
  'Blazing Star',
  'Rapid Shadow',
  'Silver Storm',
  'Wild Thunder',
  'Black Thunder',
  'Sky Flash',
  'Dust Storm',
  'Fire Runner',
  'Moon Shadow',
  'Storm Rider',
  'Wind Blade',
  'Dark Runner',
  'Golden Storm',
  'Lightning Hoof',
  'Silent Runner',
  'Night Wind',
  'Crimson Shadow',
  'Blue Storm',
  'Fast Thunder',
  'Iron Flash',
  'Shadow Blaze',
  'Storm Flash',
  'Wild Flash',
  'Thunder Wind',
  'Silver Blaze',
  'Black Wind',
  'Sky Runner',
  'Dust Flash',
  'Fire Storm',
  'Moon Flash',
  'Rapid Wind',
  'Storm Shadow',
  'Golden Runner',
  'Lightning Runner',
  'Silent Storm',
  'Night Flash',
  'Crimson Runner',
  'Blue Shadow',
  'Fast Storm',
  'Iron Runner',
  'Shadow Wind',
  'Wild Storm',
  'Thunder Flash',
  'Silver Wind',
  'Black Flash',
  'Sky Storm'
]

// ///////////////////////////////////////////////////// helpers
const genRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 30%, 50%)`
}

const getRandomName = (count: number) => {
  const names = new Set<string>()
  while (names.size < count) {
    const name = horseNames[Math.floor(Math.random() * horseNames.length)]
    if (name) names.add(name)
  }
  return Array.from(names)
}

// ///////////////////////////////////////////////////// main function
export const genHorses = (count: number): IHorse[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: crypto.randomUUID(),
    name: getRandomName(count)[i] || `Horse ${i + 1}`,
    condition: Math.floor(Math.random() * 100) + 1,
    color: genRandomColor()
  }))
}
