export type AccessLogType = {
  guestToken: string;
  historyId?: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
};

export type MaximumHitsType = {
  date: string;
  count: number;
};

export type MaximumHitsByHistoryIdType = {
  date: string;
  historyId: string;
  count: number;
};
