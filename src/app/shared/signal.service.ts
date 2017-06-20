import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SignalService {
	private signalMap = {
		"0": "Oversold Buy",
		"1": "Overbought Sell",
		"2": "Momentum Breakout",
		"3": "Momentum Breakdown",
		"4": "Reversal Buy",
		"5": "Reversal Sell",
		"6": "Money Flow Buy",
		"7": "Money Flow Sell",
		"8": "Rel. Strength Buy",
		"9": "Rel. Strength Sell",
		"10": "Rel. Strength Breakout",
		"11": "Rel. Strength Breakdown"
	};
	constructor() {}

	public parseSignal(signal) {
		if (typeof signal == "string") {
			signal = this.toInt(signal);
		}

		let buySignalNames = [];
		let sellSignalNames = [];

		if (signal != 0) {
			for (var i = 0; i < 6; i += 1) {
				if ((signal & Math.pow(2, 2 * i)) != 0) {
					buySignalNames.push(this.signalMap[2 * i]);
				}

				if ((signal & Math.pow(2, 2 * i + 1)) != 0) {
					sellSignalNames.push(this.signalMap[2 * i + 1]);
				}
			}
		}

		return {
			sell: (sellSignalNames.length > 0),
			buy: (buySignalNames.length > 0),
			sellSignalNames: sellSignalNames,
			buySignalNames: buySignalNames
		};
	}

	public reverse(s) {
		return s.split("").reverse().join("");
	}

	public toInt(signals) {
		if (typeof signals == "string") {
			signals = this.reverse(signals.replace(/-1/g, "0"));
			signals = parseInt(signals, 2);
			return signals;
		}
		return undefined;
	};

	public getSignal(parsedSignals){
		if (parsedSignals.sell == true && parsedSignals.buy == false) {
			return 0;
		} else if (parsedSignals.sell == false && parsedSignals.buy == true) {
			return 2;
		} else if (parsedSignals.sell == true && parsedSignals.buy == true) {
			return 1;
		}

		return -1; // no sell or buy signal
	}
}