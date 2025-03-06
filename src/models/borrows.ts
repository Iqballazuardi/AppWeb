export interface Borrow {
  id: number;
  bookId: number;
  userId: number;
  borrowedDate: Date;
  returnedDate: Date;
  status: "Borrowed" | "Available";
}
