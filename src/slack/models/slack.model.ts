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
  as_user: boolean;
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
