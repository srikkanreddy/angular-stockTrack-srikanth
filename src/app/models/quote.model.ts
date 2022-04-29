export interface QuoteDetail {
  c: number; //currentPrice
  d: number; //change
  dp: number; //percentageChange
  h: number; //highPriceofDay
  l: number; //lowPriceofDay
  o: number; //openPriceofDay
  pc: number; //previousClosePrice
  stockName:string; //stockname from searchAPI
}