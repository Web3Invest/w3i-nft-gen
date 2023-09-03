#!/usr/bin/env node
const { version: APP_VERSION } = require('./package.json')

// params
const config = {
  supply: 1000,
  traits: {
    materials: [
      { id: 1, name: 'Or', supply: 80 , rarity: 0.05 },
      { id: 2, name: 'Argent', supply: 100, rarity: 0.05 },
      { id: 3, name: 'Bronze', supply: 160, rarity: 0.15 },
      { id: 4, name: 'Métal', supply: 200, rarity: 0.25 },
      { id: 5, name: 'Bois', supply: 210, rarity: 0.25 },
      { id: 6, name: 'Plastique', supply: 250, rarity: 0.25 },
    ],
    ranks: [
      { id: 1, name: '1 étoile', supply: 100, rarity: 0.10 },
      { id: 2, name: '2 étoiles', supply: 175, rarity: 0.15 },
      { id: 3, name: '3 étoiles', supply: 225, rarity: 0.20 },
      { id: 4, name: '4 étoiles', supply: 250, rarity: 0.25 },
      { id: 5, name: '5 étoiles', supply: 250, rarity: 0.30 }
    ]
  }
}

// variables
const NFTList = []
const supplyList = []
const traitNames = Object.keys(config.traits)
let isPrimaryFirst = true
let loop = 0

// find the most populated trait
const traits = [ ...traitNames ] // copy names to keep the original array clean
const primaryTrait = traits.shift()
const secondaryTrait = traits.shift()

const nbPrimaryEl = config.traits[primaryTrait].length
const nbSecondaryEl = config.traits[secondaryTrait].length

isPrimaryFirst = nbPrimaryEl > nbSecondaryEl

const primaryFor = isPrimaryFirst ? nbPrimaryEl : nbSecondaryEl
const secondaryFor = isPrimaryFirst ? nbSecondaryEl : nbPrimaryEl

// functions
const printLine = () => console.info('------------------------------------------------------')

const printHeader = () => {
  printLine()
  console.info(`[-] Web3Invest NFT Generator v${APP_VERSION}`)
  console.info('[-] Checking configuration...')
  console.info('[-] Total supply:', config.supply)
  console.info('[-] Traits:', traitNames.length)
  printLine()
  traitNames.map(trait => {
    console.info(`[-]   ${trait}:`, config.traits[trait].length)
    config.traits[trait].map(t => {
      console.info(`[-]     ${t.name} ${t.name.length <= 6 ? '\t' : ''}\t[ Max: ${t.supply.toString().padStart(3, '0')} | Rarity: ${t.rarity.toString().padEnd(4, '0')} ]`)
    })
    printLine()
  })
}

const checkParams = () => {
  let maxList = []
  let stats = {}
  traitNames.map(t => stats[t] = { rarity: 0, supply: 0 })

  traitNames.map(trait => {
    maxList.push(config.traits[trait].length)

    config.traits[trait].forEach(t => {
      stats[trait].rarity += t.rarity
      stats[trait].supply += t.supply
    })
  
    // exit at first error
    if ( stats[trait].rarity !== 1 || stats[trait].supply !== config.supply ) {
      throw new Error (`${trait} check supply (${stats[trait].supply}/${config.supply}) or rarity (${stats[trait].rarity}/1) excessed error`)
    }
    
    console.info(`[✓] Trait: \t${trait} \t${trait.length <= 6 ? '\t' : ''}(${stats[trait].supply}/${config.supply})`)
  })

  const unicity = maxList[0] * maxList[1]
  console.info(`[✓] Uniq: \t${unicity}`)
}

const generateRandomNFT = () => {
  const nft = {}
  // Generate random NFT
  traitNames.map(trait => {
    // shuffle values
    nft[trait] = config.traits[trait]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .pop()
  })

  return nft
}

const initMatrice = () => {
  console.log('[-] Initialize matrice of supply...')
  if ( traitNames.length !== 2 )
    throw new Error (`This generator accept only 2 traits`)

  for (let x = 1; x <= primaryFor; x++) {
    if (!supplyList[x])
    supplyList[x] = []
  
  for (let y = 1; y <= secondaryFor; y++) {
      // init to 0 the matrice
      supplyList[x][y] = 0
    }
  }

  console.info(`[?] Rows = ${isPrimaryFirst ? primaryTrait : secondaryTrait } | Columns = ${isPrimaryFirst ?  secondaryTrait : primaryTrait }`)
}

const getLowerPool = () => {
  let currPool = { row: 1, column: 1, value: 0 }
  for (let x = 1; x <= primaryFor; x++) {
    for (let y = 1; y <= secondaryFor; y++) {
      if (currPool.value > supplyList[x][y]) {
        currPool = { row: x, column: y, value: supplyList[x][y] }
      }
    }
  }
  console.log('lower pool', currPool)
  return currPool
}

const getSupplyRangeById = (primaryID, secondaryID) => {
  const pTrait = config.traits[primaryTrait].find(t => t.id === primaryID)
  const sTrait = config.traits[secondaryTrait].find(t => t.id === secondaryID)
  const range = {
    max: pTrait.supply > sTrait.supply ? pTrait.supply : sTrait.supply,
    min: pTrait.supply < sTrait.supply ? pTrait.supply : sTrait.supply
  }
  return range
}

// app
printHeader()
checkParams()
printLine()

initMatrice()

while ( NFTList.length < config.supply ) {
  loop += 1
  const nft = generateRandomNFT()

  const currMatrice = {
    column: nft[secondaryTrait].id,
    row: nft[primaryTrait].id,
    value: supplyList[nft[primaryTrait].id][nft[secondaryTrait].id]
  }

  const rangeSupply = { ...getSupplyRangeById(nft[primaryTrait].id, nft[secondaryTrait].id), current: currMatrice.value }

  if ( rangeSupply.min < rangeSupply.current < rangeSupply.max ) {
    NFTList.push({ id: loop, ...nft })
    supplyList[nft[primaryTrait].id][nft[secondaryTrait].id] += 1
  }
}

console.log(`[✓] Generated supply`)
console.table(supplyList)
