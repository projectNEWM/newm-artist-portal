export interface SongState {
  songs: Array<Song>;
}

export type GetSongsResponse = Array<Song>;

export interface UploadSongFormValues {
  readonly image?: any; // eslint-disable-line
  readonly audio?: any; // eslint-disable-line
  readonly title: string;
  readonly genre: string;
  readonly description: string;
  readonly isMinting: boolean;
}

export interface UploadSongRequest {
  readonly title: string;
  readonly genre: string;
  readonly coverArtUrl: string;
  readonly description?: string;
  readonly credits?: string;
}

export interface UploadSongResponse {
  readonly songId: string;
}

export interface CloudinarySignatureResponse {
  readonly signature: string;
  readonly timestamp: number;
  readonly cloudName: string;
  readonly apiKey: string;
}

export interface Song {
  readonly id: string;
  readonly ownerId: string;
  readonly title: string;
  readonly genre: string;
  readonly description?: string;
  readonly coverArtUrl?: string;
  readonly createdAt: string;
}

export interface Artist {
  readonly bio: string;
  readonly name: string;
  readonly roles: string;
}

export interface Contributor {
  readonly name: string;
  readonly role: string;
  readonly stake: number;
}
