import * as React from "react";
import "./index.less";

const imgs: string[] = [
  "http://localhost/static/1.jpg",
  "http://localhost/static/2.jpg",
  "http://localhost/static/3.jpg",
  "http://localhost/static/4.jpg"
];

export class Banner extends React.Component<{}, {}> {
  private preImg: string = null;
  private showImg: string = null;
  private nextImg: string = null;
  private preImgContainer: HTMLImageElement = null;
  private showImgContainer: HTMLImageElement = null;
  private nextImgContainer: HTMLImageElement = null;
  private preDOM: HTMLElement = null;
  private showDOM: HTMLElement = null;
  private nextDOM: HTMLElement = null;
  private scrollBanner: HTMLElement = null;
  private scrollBannerIndicator: HTMLElement = null;
  private timer: number = null;

  private startPageX: number = 0;
  private startTime: number = Date.now();
  private swipeDir?: boolean = null;
  private swipeVector: number = 0;
  private hasMove: boolean = false;

  public componentDidMount(): void {
    this.scrollBanner = document.getElementById("scrollBanner");
    this.scrollBannerIndicator = document.getElementById("scrollBannerIndicate");
    for (let c: number = 0; c < imgs.length; c += 1) {
      let spanDom: HTMLSpanElement = document.createElement("span");
      spanDom.addEventListener("click", this.handleIndicaterClick.bind(this));
      this.scrollBannerIndicator.appendChild(spanDom);
    }
    this.setIndicate(0);
    this.scrollBanner.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.scrollBanner.addEventListener("touchmove", this.handleTouthMove.bind(this));
    this.scrollBanner.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.scrollBanner.style.width = (window.innerWidth * 3) + "px";
    this.scrollBanner.style.height = (window.innerWidth / 5 * 1.8) + "px";
    this.scrollBanner.style.left = -window.innerWidth + "px";
    for (let i: number = 0; i < this.scrollBanner.children.length; i += 1) {
      let scrollItem: HTMLElement = this.scrollBanner.children[i] as HTMLElement;
      scrollItem.style.width = window.innerWidth + "px";
      scrollItem.style.display = "inline-block";
      switch (i) {
        case 0:
          this.preDOM = scrollItem;
          this.preImgContainer = scrollItem.getElementsByTagName("img")[0] as HTMLImageElement;
          this.preDOM.style.left = "0";
          break;
        case 1:
          this.showDOM = scrollItem;
          this.showImgContainer = scrollItem.getElementsByTagName("img")[0] as HTMLImageElement;
          this.showDOM.style.left = window.innerWidth + "px";
          break;
        case 2:
          this.nextDOM = scrollItem;
          this.nextImgContainer = scrollItem.getElementsByTagName("img")[0] as HTMLImageElement;
          this.nextDOM.style.left = window.innerWidth * 2 + "px";
          break;
        default:
      }
    }
    this.preImgContainer.src = imgs[imgs.length - 1];
    this.showImgContainer.src = imgs[0];
    this.nextImgContainer.src = imgs[1];

    this.setTimer();
  }

  private setIndicate(index: number): void {
    for (let i: number = 0; i < this.scrollBannerIndicator.children.length; i += 1) {
      let item: HTMLSpanElement = this.scrollBannerIndicator.children[i] as HTMLSpanElement;
      item.style.background = index === i ? "#f60" : "white";
    }
  }

  private handleTouchStart(e: TouchEvent): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.startTime = Date.now();
    this.startPageX = e.changedTouches[0].pageX;
  }

  private handleTouthMove(e: TouchEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.hasMove = true;
    this.swipeDir = null;
    const movePageX: number = e.targetTouches[0].pageX;
    this.swipeVector = movePageX - this.startPageX;
    this.scrollBanner.style.left = -window.innerWidth + this.swipeVector + "px";
  }

  private handleTouchEnd(e: TouchEvent): void {
    const endTime: number = Date.now();
    if (this.hasMove &&
      Math.abs(this.swipeVector) > 100 ||
      (endTime - this.startTime) < 1000
    ) {
      this.swipeDir = this.swipeVector < 0;
    }
    this.hasMove = false;
    this.animation(this.swipeDir);
    this.setTimer();
  }

  private handleIndicaterClick(e: MouseEvent): void {
    let item: HTMLSpanElement = e.target as HTMLSpanElement;
    let clickIndex: number = [].slice.call(this.scrollBannerIndicator.children).indexOf(item);
    const index: number = imgs.indexOf(this.showImg);
    if (clickIndex === index) { return; }
    this.swipeDir = clickIndex > index;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    // console.log(index, 'clickIndex:', clickIndex);
    this.animation(this.swipeDir, clickIndex, this.setTimer.bind(this));
  }

  private setTimer = () => {
    this.timer = setInterval(() => {
      this.animation(true);
    }, 5000);
  }

  private animation(toRight: boolean, index?: number, cb?: Function): void {
    this.scrollBanner.style.transition = "all 0.3s ease";
    if (toRight === null) {
      this.scrollBanner.style.left = -window.innerWidth + "px";
      return;
    }
    let tempIndex: number = 0;
    if (toRight) {
      let nextSrc: string = this.nextImgContainer.src;
      tempIndex = imgs.indexOf(nextSrc);
      this.showImg = nextSrc;
      // let nextIndex: number = (nextImgIndex + 1) === imgs.length ? 0 : nextImgIndex + 1;
      // this.nextImg = imgs[nextIndex];
      // this.preImg = this.showImgContainer.src;
    } else {
      let preSrc: string = this.preImgContainer.src;
      tempIndex = imgs.indexOf(preSrc);
      this.showImg = preSrc;
      // let preIndex: number = (preImgIndex - 1) === -1 ? imgs.length - 1 : preImgIndex - 1;
      // this.preImg = imgs[preIndex];
      // this.nextImg = this.showImgContainer.src;
    }

    if (index || index === 0) {
      // console.log(index);
      tempIndex = index;
      if (toRight) {
        this.nextImg = imgs[index];
        this.nextImgContainer.src = this.nextImg;
      } else {
        this.preImg = imgs[index];
        this.preImgContainer.src = this.preImg;
      }
      // this.scrollBanner.style.left = toRight ? -window.innerWidth * 2 + "px" : "0px";
      // setTimeout(() => {
      //   this.showImg = temp;
      //   this.preImgContainer.src = this.preImg;
      //   this.nextImgContainer.src = this.nextImg;
      //   this.showImgContainer.src = this.showImg;
      //   this.scrollBanner.style.transition = "none";
      //   this.scrollBanner.style.left = -window.innerWidth + "px";

      //   const _index: number = imgs.indexOf(this.showImg);
      //   this.setIndicate(_index);
      //   cb && cb();
      // }, 300);
      // return;
    }

    this.scrollBanner.style.left = toRight ? -window.innerWidth * 2 + "px" : "0px";
    setTimeout(() => {
      this.preImg = imgs[(tempIndex - 1) < 0 ? imgs.length - 1 : tempIndex - 1];
      this.showImg = imgs[tempIndex];
      this.nextImg = imgs[(tempIndex + 1) >= imgs.length ? 0 : tempIndex + 1];
      this.nextImgContainer.src = this.nextImg;
      this.preImgContainer.src = this.preImg;
      this.showImgContainer.src = this.showImg;
      this.scrollBanner.style.transition = "none";
      this.scrollBanner.style.left = -window.innerWidth + "px";

      const _index: number = imgs.indexOf(this.showImg);
      this.setIndicate(_index);
      cb && cb();
    }, 300);
  }

  // private res

  public render(): JSX.Element {
    return (
      <div style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
        <div className="scroll-banner" id="scrollBanner">
          <div>
            <img src={this.preImg} />
          </div>
          <div>
            <img src={this.showImg} />
          </div>
          <div>
            <img src={this.nextImg} />
          </div>
        </div>
        <div className="scroll-banner-indicate" id="scrollBannerIndicate">
          {}
        </div>
      </div>
    );
  }
}
