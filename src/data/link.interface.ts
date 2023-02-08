export interface ILink {
  id: string;
  scheme?: string;
  path?: string;
  raw_shortened_path_id: string;
  root?: string;
  shortened_path: string;
  shortened_uri: string;
  uri: string;
  count: number;
  created_date: string;
}
