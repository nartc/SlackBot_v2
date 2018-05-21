export class SlashCommandPayload {
  response_url: string;
  team_id: string;
  token?: string;
  team_domain?: string;
  enterprise_id?: string;
  enterprise_name?: string;
  channel_id?: string;
  channel_name?: string;
  user_id?: string;
  user_name?: string;
  command?: string;
  text?: string;
  trigger_id?: string;
}

export class Reaction {
  count?: number;
  name?: string;
  users?: string[];
}

export class Attachment {
  image_bytes?: number;
  image_width?: number;
  image_height?: number;
  image_url?: string;
  fallback?: string;
  id?: number;
}

export class Reply {
  ts?: string;
  user?: string;
}

export class Comment {
  comment?: string;
  reactions?: Reaction[];
  created?: Date;
  timestamp?: number;
  pinned_to?: string[];
  is_intro?: boolean;
  user?: string;
  id?: string;
  file?: any;
}

export class UserProfile {
  first_name?: string;
  display_name?: string;
  name?: string;
  team?: string;
  real_name?: string;
  avatar_hash?: string;
  is_ultra_restricted?: boolean;
  is_restricted?: boolean;
  image_72?: string;
}

export class MessageResponse {
  comment?: Comment;
  reactions?: Reaction[];
  attachments?: Attachment[];
  last_read?: string;
  text?: string;
  topic?: string;
  display_as_bot?: boolean;
  reply_count?: number;
  replies?: Reply[];
  user_team?: string;
  subscribed?: boolean;
  icons?: {
    emoji?: string;
  };
  purpose?: string;
  ts?: string;
  subtype?: string;
  type?: string;
  username?: string;
  source_team?: string;
  user_profile?: UserProfile;
  user?: string;
  old_name?: string;
  thread_ts?: string;
  permalink?: string;
  name?: string;
  upload?: boolean;
  pinned_to?: string[];
  unread_count?: number;
  is_intro?: boolean;
  team?: string;
  inviter?: string;
  bot_id?: string[] | any;
}

export class SuccessResponse {
  message: MessageResponse;
  ok?: boolean;
  ts?: string;
  channel?: string;
}

export class ErrorResponse {
  ok?: boolean;
  error?: string;
}

export class BotMessage {
  text?: string;
  attachments?: MessageAttachment[];
  thread_ts?: string;
  response_type?: string;
  replace_original?: boolean;
  delete_original?: boolean;
}

class GlobalAttachment {
  fallback: string;
  text?: string;
  pretext?: string;
  mrkdwn?: boolean;
  fields?: [{
    title?: string;
    value?: string;
    short?: boolean;
  }];
  ts?: number;
  footer?: string;
  footer_icon?: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  color?: string;
  title?: string;
}

export class MessageAttachment extends GlobalAttachment {
  callback_id: string;
  actions?: MessageAction[];
  attachment_type?: string;
}

export class WebClientMessageAttachment extends GlobalAttachment {
  title_link?: string;
  text?: string;
  image_url?: string;
  thumb_url?: string;
}

export class MessageAction {
  name: string;
  text: string;
  type: 'button' | 'select';
  value?: string;
  confirm?: MessageConfirm;
  style?: 'default' | 'primary' | 'danger';
  options?: MenuMessageOption[];
  option_groups?: MenuMessageOptionGroup[];
  data_source?: 'static' | 'users' | 'channels' | 'conversations' | 'external';
  selected_options?: MenuMessageOption[];
  min_query_length?: number;
}

class MessageConfirm {
  text: string;
  title?: string;
  ok_text?: string;
  dismiss_text?: string;
}

class MenuMessageOption {
  text: string;
  value: string;
  description?: string;
}

class MenuMessageOptionGroup {
  text: string;
  options: MenuMessageOption[];
}

export class Message {
  token: string;
  channel: string;
  text: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  reply_broadcast?: boolean;
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
  replace_original?: boolean;
}

export class SlackUser {
  id: string;
  team_id: string;
  name: string;
  deleted: boolean;
  color?: string;
  real_name?: string;
  tz?: string;
  tz_label?: string;
  tz_offset?: number;
  profile: SlackUserProfile;
  is_admin?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  is_bot?: boolean;
  updated?: number;
  is_app_user?: boolean;
  has_2fa?: boolean;
}

export class SlackUserProfile {
  avatar_hash?: string;
  status_text?: string;
  status_emoji?: string;
  real_name?: string;
  display_name?: string;
  real_name_normalized?: string;
  display_name_normalized?: string;
  email?: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_72?: string;
  image_192?: string;
  image_512?: string;
  team?: string;
}

export class GetUserResponse {
  ok: boolean;
  user?: SlackUser;
  error?: string;
}

export interface ActionPayload {
  actions?: Action[];
  callback_id?: string;
  team?: Team;
  channel?: Channel;
  user?: User;
  action_ts?: string;
  message_ts?: string;
  attachment_id?: string;
  token?: string;
  original_message?: string;
  response_url?: string;
  submission?: Submission;
  trigger_id?: string;
}

interface Submission {
  value?: string;

  [key: string]: string;
}

interface Team {
  id?: string;
  domain?: string;
}

interface Channel {
  id?: string;
  name?: string;
}

interface User {
  id?: string;
  name?: string;
}

interface Action {
  name?: string;
  value?: string;
  type?: string;
  selected_options?: MenuMessageOption[];
}
