import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
  selector: 'mid-tier-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class StockComponent implements OnInit {

  public symbol: string;
  public src: string;
  public sanitizedSrc: SafeUrl;

  apiHostName = environment.envProtocol + '://' + environment.envHostName;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          console.log('activated route', params);
          if (params.symbol) {
            this.symbol = params.symbol;
          } else {
            this.symbol = 'AAPL';
          }
        this.src = `https://dev.chaikinanalytics.com/CPTRestSecure/StockSummary/index.html?lang=English&uid=9582&environment=desktop&subEnvironment=chaikinAnalytics&version=1.3.2&symbol=${this.symbol}&userType=CAUser`;
        this.sanitizedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
        }
      )
  }

}
