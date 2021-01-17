const tr = s => s.replace(/\/+$/, '');
const tl = s => s.replace(/^\/+/, '');

const isAbsoluteUrl = s => {
  const pat = /^https?:\/\//i;
  return pat.test(s);
};

export class AppConfig {
  constructor(private config) {}

  get serviceBase(): string {
    return isAbsoluteUrl(this.config.serviceBase)
      ? tl(this.config.serviceBase)
      : '/' + tl(tr(this.config.serviceBase));
  }
}
