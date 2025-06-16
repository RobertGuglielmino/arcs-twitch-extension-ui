

export default function CourtGrid(cards: string[]) {
  return (<div className="flex flex-col gap-2 m-1 justify-center items-center flex-wrap">
    {cards.map(card => <img src={card} />)}
  </div>); 
}