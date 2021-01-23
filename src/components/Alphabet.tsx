import { Component, h } from "preact";

export type AlphabetProps = { text: string }
export default class Alphabet extends Component<AlphabetProps, {}> {
  render({ text = 'A' }: AlphabetProps) {
    return (
      <span class="flex flex-row items-end tracking-wide">
        <img src={require(`@/assets/alphabet/${text.slice(0, 1)}.gif`).default} />
        { text.length > 1 &&
          <span>{text.slice(1)}</span>
        }
      </span>
    )
  }
}
