export type listVideoAll = {
    id_vid: string;
    thumbnail: string;
    title: string;
    displayname: string;
    photo: string;
  }
export type playVideoType = {
  id_vid :string,
  id_user: string,
  thumbnail : string,
  videos: string,
  title : string,
  desc_vid: string,
  like_vid: bigint,
  dislike: bigint
  id_categories: bigint,
  displayname: string,
  followers: bigint,
  photo: string,
}

export type videoCredential = {
  id_user: string;
  title: string;
  desc_vid: string;
  thumbnail: File;
  videos: File;
};
export type videoListUser = {
  id_vid: string,
  thumbnail : string,
  title: string,
  desc_vid: string,
}