export type rakutenSerachItemResponse = {
  GenreInformation: [];
  Items: Item[];
};

type Item = {
  affiliateRate: number;
  affiliateUrl: string;
  asurakuArea: string;
  asurakuClosingTime: string;
  asurakuFlag: number;
  availability: number;
  catchcopy: string;
  creditCardFlag: number;
  endTime: string;
  genreId: string;
  giftFlag: number;
  imageFlag: number;
  itemCaption: string;
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  mediumImageUrls: imageUrl[];
  pointRate: number;
  pointRateEndTime: string;
  pointRateStartTime: string;
  postageFlag: number;
  reviewAverage: number;
  reviewCount: number;
  shipOverseasArea: string;
  shipOverseasFlag: number;
  shopAffiliateUrl: string;
  shopCode: string;
  shopName: string;
  shopOfTheYearFlag: number;
  shopUrl: string;
  smallImageUrls: imageUrl[];
  startTime: string;
  tagIds: number[];
  taxFlag: number;
};

type imageUrl = {
  imageUrl: string;
};
