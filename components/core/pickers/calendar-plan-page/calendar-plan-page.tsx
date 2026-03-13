// Calendar Plan Page — reference component
// Adapted from Figma DS Core node 5015:1669
// Depends on: DayItemSimpleCalendar (shared with calendar-simple)
// Stack note: adapt styling tokens to your project's CSS/token system.

type DayItemState = "Disable" | "Available" | "Selected";
type DayItemType = "Planned" | "No-plan";

type DayItemSimpleCalendarProps = {
  date?: string;
  state?: DayItemState;
  today?: boolean;
  type?: DayItemType;
  className?: string;
};

// DayItemSimpleCalendar — individual 40×40px day cell.
// Shared sub-component with Calendar Simple.
function DayItemSimpleCalendar({
  date = "00",
  state = "Available",
  today = false,
  type = "No-plan",
  className,
}: DayItemSimpleCalendarProps) {
  const isSelected = state === "Selected" && !today;
  const isTodayAvailable = state === "Available" && today;
  const isDisabled = state === "Disable" && !today;
  const isPlanned = type === "Planned" && state === "Available" && !today;

  return (
    <div
      className={
        className ||
        [
          "relative",
          "w-[40px] h-[40px]",
          isDisabled || isPlanned ? "rounded-[24px]" : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
      aria-label={date}
      aria-disabled={isDisabled ? true : undefined}
    >
      {/* Today highlight — lighter circle background */}
      {isTodayAvailable && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-name="bg-today"
        >
          <div
            className="w-[36px] h-[36px] rounded-full bg-[var(--day-item/bg-today)]"
            // TODO: Replace with confirmed today-highlight token
          />
        </div>
      )}

      {/* Selected — dark circle background */}
      {isSelected && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-name="bg-selected"
        >
          <div className="w-[36px] h-[36px] rounded-full bg-[var(--day-item/bg-selected,#1d1d23)]" />
        </div>
      )}

      {/* Date number */}
      <p
        className={[
          "absolute left-1/2 -translate-x-1/2 top-[calc(50%-12px)]",
          "font-[family-name:var(--font-family/body,'Manrope',sans-serif)]",
          "font-[var(--weight/semibold,600)]",
          "text-[length:var(--size/lg,16px)]",
          "leading-[1.4]",
          "tracking-[var(--letter-spacing/normal,0px)]",
          "text-center whitespace-nowrap",
          isDisabled
            ? "text-[color:var(--day-item/text-disabled,#636377)]"
            : isSelected
            ? "text-[color:var(--day-item/text-selected,#f1f2f4)]"
            : "text-[color:var(--day-item/text-default,#1d1d23)]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {date}
      </p>

      {/* Planned indicator dot */}
      {isPlanned && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[29px] w-[6px] h-[6px] rounded-full bg-[var(--day-item/indicator-planned,#ff6b26)]"
          data-name="indicator-planned"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

export type CalendarPlanPageState = "Default" | "Today" | "Active" | "small";

type CalendarPlanPageProps = {
  /** Controls which visual state the calendar renders in. */
  state?: CalendarPlanPageState;
  className?: string;
};

/**
 * CalendarPlanPage
 *
 * Monthly calendar for the Dojo Plan page. Embedded in a bottom sheet or
 * drawer panel. Supports a collapsible `small` state that shows only the
 * current week row.
 *
 * Sub-components:
 * - DayItemSimpleCalendar — individual day cell (shared with Calendar Simple)
 *
 * @see components/calendar-plan-page/index.mdx
 */
export default function CalendarPlanPage({
  state = "Default",
  className,
}: CalendarPlanPageProps) {
  const isSmall = state === "small";
  const isActive = state === "Active";
  const isActiveOrSmall = isActive || isSmall;
  const isToday = state === "Today";

  return (
    <div
      className={
        className ||
        [
          "relative flex flex-col items-center",
          "gap-[var(--spacing-4,4px)]",
          "px-[var(--spacing-16,16px)]",
          "pt-[var(--spacing-0,0px)] pb-[var(--spacing-4,4px)]",
          "bg-[var(--surface/neutral/default,#f1f2f4)]",
          "rounded-bl-[var(--rounded-16,16px)] rounded-br-[var(--rounded-16,16px)]",
          "w-[390px]",
          isSmall ? "overflow-clip" : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {/* Calendar wrapper */}
      <div className="flex flex-col items-start w-full shrink-0">

        {/* Weekday header row */}
        <div
          className={[
            "flex items-start w-full shrink-0",
            isSmall ? "h-[36px]" : "h-[40px]",
          ].join(" ")}
          data-name="Weekday"
        >
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className="flex flex-1 flex-col items-center justify-center h-[40px] p-[8px]"
              data-name="Week Item"
              aria-hidden="true"
            >
              <p className="font-[family-name:var(--font-family/body,'Manrope',sans-serif)] font-[var(--weight/regular,400)] text-[length:var(--size/2xs,11px)] leading-[1.2] text-[color:var(--text/placeholder,#636377)] text-center whitespace-nowrap">
                {day}
              </p>
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div
          className={[
            "w-full shrink-0",
            isSmall ? "h-[48px] overflow-clip relative" : "flex flex-col items-start",
          ].join(" ")}
          data-name="day-grid"
        >
          {/* Week row 1 — prev-month overflow + first days */}
          <div
            className={[
              "flex items-center w-full",
              isSmall ? "absolute h-[40px] justify-between left-0 top-[-36px]" : "relative shrink-0",
            ].join(" ")}
          >
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="26" state="Disable" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="27" state="Disable" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="28" state="Disable" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="1" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="2" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="3" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="4" />
          </div>

          {/* Week row 2 — current week (visible in small state) */}
          <div
            className={[
              "flex items-center w-full",
              isSmall ? "absolute h-[40px] justify-between left-0 top-[4px]" : "relative shrink-0",
            ].join(" ")}
          >
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="5" />
            <DayItemSimpleCalendar
              className="flex-1 h-[40px] relative"
              date="6"
              state={isActiveOrSmall ? "Selected" : "Available"}
            />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="7" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="8" />
            <DayItemSimpleCalendar
              className="flex-1 h-[40px] relative"
              date="9"
              state={isToday ? "Selected" : "Available"}
              today={isActiveOrSmall ? true : false}
            />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="10" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="11" />
          </div>

          {/* Week row 3 */}
          <div
            className={[
              "flex items-center w-full",
              isSmall ? "absolute h-[40px] justify-between left-0 top-[44px]" : "relative shrink-0",
            ].join(" ")}
          >
            {["12", "13", "14", "15", "16", "17", "18"].map((d) => (
              <DayItemSimpleCalendar key={d} className="flex-1 h-[40px] relative" date={d} />
            ))}
          </div>

          {/* Week row 4 */}
          <div
            className={[
              "flex items-center w-full",
              isSmall ? "absolute h-[40px] justify-between left-0 top-[84px]" : "relative shrink-0",
            ].join(" ")}
          >
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="19" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="20" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="21" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="22" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="23" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="24" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="25" />
          </div>

          {/* Week row 5 — last days + next-month overflow */}
          <div
            className={[
              "flex items-center w-full",
              isSmall ? "absolute h-[40px] justify-between left-0 top-[124px]" : "relative shrink-0",
            ].join(" ")}
          >
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="26" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="27" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="28" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="29" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="30" type="Planned" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative" date="31" />
            <DayItemSimpleCalendar className="flex-1 h-[40px] relative rounded-[24px]" date="1" state="Disable" />
          </div>
        </div>
      </div>

      {/* Bottom drag handle */}
      <div
        className="bg-[var(--button/secondary/bg-default,rgba(29,29,35,0.05))] h-[4px] rounded-[10px] shrink-0 w-[32px]"
        data-name="handle"
        aria-label="Collapse calendar"
        role="button"
        tabIndex={0}
      />
    </div>
  );
}
