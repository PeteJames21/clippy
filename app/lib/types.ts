export type TextItemProps = {
  id?: number,
  content?: string,
  public?: boolean,
  description?: string,
  tags?: string,
  collectionID?: number,
  collectionName?: string,  // To be removed once we make it possible to select from existing collections
  userID?: number,
}
