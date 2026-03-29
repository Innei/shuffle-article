export interface ShuffledCharacter {
  char: string
  x: number
  y: number
}

export interface ShuffledBlock {
  characters: ShuffledCharacter[]
  height: number
  margin: string
}

export interface ShuffleLayoutInput {
  text: string
  margin?: string
}

export interface ShuffleLayoutOptions {
  font: string
  lineHeight: number
  maxWidth: number
  textIndent?: number
}

export interface ShuffleAllOptions {
  selector?: string
}
