import { Profile, ProfileStatus } from "../../graphql/graphql";

export interface CurrentProfileState {
  status?: ProfileStatus;
  profile?: Profile;
}
