// eslint-disable
// this is an auto generated file. This will be overwritten

export const getAnnouncement = `query GetAnnouncement($id: ID!) {
  getAnnouncement(id: $id) {
    id
    title
    description
    image
    price
  }
}
`;
export const listAnnouncements = `query ListAnnouncements(
  $filter: ModelAnnouncementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnnouncements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      image
      price
    }
    nextToken
  }
}
`;
