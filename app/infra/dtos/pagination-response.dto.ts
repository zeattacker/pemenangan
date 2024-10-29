export interface PaginationResponseDto<T> {
  data: T;
  meta: {
    page: number;
    totalData: number;
    totalPage: number;
  };
}

export interface SelectItem {
  value: string;
  label: string;
}
