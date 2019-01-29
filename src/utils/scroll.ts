
const shiftBottomScroll = 100;

/** Class work with scroll, when user scrolls down element */
export class Scroll {
  protected page: number;

  constructor( page: number) {
    this.page = page;
  }

  /**
   * Call handler when user scrolls down element
   * @param maxPage - max count pages
   * @param scrollTop - scrollTop from scrolled element
   * @param offsetHeight - offsetHeight from scrolled element
   * @param scrollHeight - scrollHeight from scrolled element
   * @param handler - called handler
   */
  ScrollDown (
    maxPage: number,
    scrollTop: number,
    offsetHeight: number,
    scrollHeight: number,
    handler: any
  ): number {
    const pos: number = scrollTop + offsetHeight;

    if (pos <  scrollHeight - shiftBottomScroll) {
      return this.page;
    }

    this.page++;

    if (this.page > maxPage) {
      this.page = maxPage;
      return this.page;
    }

    handler(this.page);

    return this.page;
  }

}
