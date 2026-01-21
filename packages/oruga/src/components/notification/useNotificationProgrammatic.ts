import type { Component } from "vue";
import {
  ProgrammaticFactory,
  type ProgrammaticComponentOptions,
  type ProgrammaticExpose,
  type ProgrammaticTarget,
} from "../programmatic";
import { getOption } from "@/utils/config";

import NotificationNotice from "./NotificationNotice.vue";

import type { NotificationProps, NotificationNoticeProps } from "./props";

declare module "../../index" {
  interface OrugaProgrammatic {
    notification: Required<
      InstanceType<typeof NotificationProgrammaticFactory>
    >;
  }
}

export type NotificationProgrammaticOptions<C extends Component> = Readonly<
  Omit<NotificationNoticeProps<C>, "container">
> &
Readonly<NotificationProps> &
ProgrammaticComponentOptions<typeof NotificationNotice<C>>;

export class NotificationProgrammaticFactory extends ProgrammaticFactory {
  /**
   * Create a new programmatic notification component instance.
   * @param options - Notification message string or notification component props object.
   * @param target - A target container the component get rendered into - default is `document.body`.
   * @returns ProgrammaticExpose - programmatic component expose interface
   */
  public open<C extends Component>(
    options: string | NotificationProgrammaticOptions<C>,
    target?: ProgrammaticTarget,
  ): ProgrammaticExpose<typeof NotificationNotice<C>> {
    const _options: NotificationProgrammaticOptions<C> =
      typeof options === "string" ? { message: options } : options;

    const componentProps: NotificationProgrammaticOptions<C> = {
      position: getOption("notification.position", "top-right"),
      ..._options, // pass all props to the internal notification component
    };

    // create programmatic component
    return this._create(
      NotificationNotice,
      {
        props: componentProps as NotificationNoticeProps<C>, // component specific props
        onClose: _options.onClose, // on close event handler
      },
      target, // target the component get rendered into
    );
  }
}

export default function useNotificationProgrammatic(): NotificationProgrammaticFactory {
  return new NotificationProgrammaticFactory();
}
