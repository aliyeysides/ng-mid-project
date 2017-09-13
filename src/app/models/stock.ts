const PGRVALUES = {
  1: 'VERY_BEARISH',
  2: 'BEARISH',
  3: 'NEGATIVE_NEUTRAL',
  4: 'NEUTRAL',
  5: 'POSITIVE_NEUTRAL',
  6: 'BULLISH',
  7: 'VERY_BULLISH'
};

export class Stock {
  constructor(public EPSData: object,
              public metaInfo: object[],
              public pgr: object[],
              public fundamentalData: object,
              public status: string) {
  }

  private static _extractData(arr) {
    let result = [];
    arr.forEach(val => {
      if (Object.keys(val)[0] != 'Value') {
        result.push(val);
      }
    });
    return result;
  }

  private static _extractKeys(arr) {
    let result = [];
    arr.forEach(obj => {
      result.push(Object.keys(obj)[0]);
    });
    return result;
  }

  public displayRating() {
    let rawPGR = this.getPGR(),
      correctedPGR = this.getCorrectedPgr();
    if (rawPGR >= 4 && correctedPGR === 3) {
      return PGRVALUES[5];
    } else if (rawPGR <= 2 && correctedPGR === 3) {
      return PGRVALUES[3];
    } else if (rawPGR === 3 && correctedPGR === 3) {
      return PGRVALUES[4];
    } else if (rawPGR === -1 || correctedPGR === -1) {
      return 'NONE'
    } else if (correctedPGR === 1 || correctedPGR === 2) {
      return PGRVALUES[+correctedPGR];
    } else {
      return PGRVALUES[+correctedPGR + 2];
    }
  }

  getStockSymbol(): string {
    return this.EPSData['symbol'];
  }

  getPGR(): number {
    return this.pgr[0]['PGR Value'];
  }

  getFinancials(): object[] {
    return Stock._extractData(this.pgr[1]['Financials']);
  }

  getFinacialValue(): number {
    return this.pgr[1]['Financials'][0]['Value'];
  }

  getFinancialKeys(): string[] {
    return Stock._extractKeys(this.getFinancials());
  }

  getEarnings(): object[] {
    return Stock._extractData(this.pgr[2]['Earnings']);
  }

  getEarningsValue(): number {
    return this.pgr[2]['Earnings'][0]['Value'];
  }

  getEarningsKeys(): string[] {
    return Stock._extractKeys(this.getEarnings());
  }

  getTechnicals(): object[] {
    return Stock._extractData(this.pgr[3]['Technicals']);
  }

  getTechnicalsValue(): number {
    return this.pgr[3]['Technicals'][0]['Value'];
  }

  getTechnicalKeys(): string[] {
    return Stock._extractKeys(this.getTechnicals());
  }

  getExperts(): object[] {
    return Stock._extractData(this.pgr[4]['Experts']);
  }

  getExpertsValue(): number {
    return this.pgr[4]['Experts'][0]['Value'];
  }

  getExpertKeys(): string[] {
    return Stock._extractKeys(this.getExperts());
  }

  getCorrectedPgr(): number {
    return this.pgr[5]['Corrected PGR Value'];
  }

  getPGRStats(): object {
    return this.pgr[6];
  }

}
