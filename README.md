# Web3Invest - NFT Generator

> Generate NFT Collection

## Install

Just clone this repository, nothing else is needed.

## Configuration

Open `index.js` and edit `config` object parameter.

## Run

Use one of these commands in your working directory  

> `npm run start`

or

> `node index.js`  

## Example

```
$ node index.js
------------------------------------------------------
[-] Web3Invest NFT Generator v1.0.0
[-] Checking configuration...
[-] Total supply: 1000
[-] Traits: 2
------------------------------------------------------
[-]   materials: 6
[-]     Or              [ Max: 080 | Rarity: 0.05 ]
[-]     Argent          [ Max: 100 | Rarity: 0.05 ]
[-]     Bronze          [ Max: 160 | Rarity: 0.15 ]
[-]     Métal           [ Max: 200 | Rarity: 0.25 ]
[-]     Bois            [ Max: 210 | Rarity: 0.25 ]
[-]     Plastique       [ Max: 250 | Rarity: 0.25 ]
------------------------------------------------------
[-]   ranks: 5
[-]     1 étoile        [ Max: 100 | Rarity: 0.10 ]
[-]     2 étoiles       [ Max: 175 | Rarity: 0.15 ]
[-]     3 étoiles       [ Max: 225 | Rarity: 0.20 ]
[-]     4 étoiles       [ Max: 250 | Rarity: 0.25 ]
[-]     5 étoiles       [ Max: 250 | Rarity: 0.30 ]
------------------------------------------------------
[✓] Trait:      materials       (1000/1000)
[✓] Trait:      ranks           (1000/1000)
[✓] Uniq:       30
------------------------------------------------------
[-] Initialize matrice of supply...
[?] Rows = materials | Columns = ranks
[✓] Generated supply
┌─────────┬────┬────┬────┬────┬────┐
│ (index) │ 1  │ 2  │ 3  │ 4  │ 5  │
├─────────┼────┼────┼────┼────┼────┤
│    1    │ 29 │ 34 │ 32 │ 37 │ 33 │
│    2    │ 34 │ 35 │ 30 │ 36 │ 32 │
│    3    │ 29 │ 23 │ 33 │ 29 │ 33 │
│    4    │ 32 │ 34 │ 31 │ 42 │ 39 │
│    5    │ 36 │ 37 │ 35 │ 31 │ 35 │
│    6    │ 26 │ 37 │ 34 │ 39 │ 33 │
└─────────┴────┴────┴────┴────┴────┘
```