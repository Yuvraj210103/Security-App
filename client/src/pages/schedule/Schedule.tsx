import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import dayjs from "dayjs";
import { MdCalendarToday } from "react-icons/md";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex justify-between w-full p-4 rounded bg-primaryGold text-surface items-center">
        <span className="font-semibold text-xl">Schedule</span>

        <button className="bg-primary text-surface px-4 py-2 rounded">
          Save Changes
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="font-medium">
          Week of {dayjs(selectedDate).format("MMM DD, YYYY")}
        </div>
        <DatePickerInput
          rightSection={
            <label>
              <MdCalendarToday size={16} className="cursor-pointer" />
            </label>
          }
          value={selectedDate}
          onChange={(e) => setSelectedDate(e)}
        />
      </div>

      <table className="border-b border-gray-500">
        <thead className="text-sm font-normal">
          <tr>
            <th className="w-[20%] text-center">&nbsp;</th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate).startOf("week").format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(1, "day")
                .format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(2, "day")
                .format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(3, "day")
                .format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(4, "day")
                .format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(5, "day")
                .format("MMM-DD - ddd")}
            </th>
            <th className="w-[11.42%] text-center">
              {dayjs(selectedDate)
                .startOf("week")
                .add(6, "day")
                .format("MMM-DD - ddd")}
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {/* This row will have unassigned shifts */}
          <tr className="bg-primaryGold/40">
            <td className="text-start px-2 py-2 border-t border-l border-gray-500 align-bottom font-semibold">
              (Unassigned Shifts)
            </td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500">
              <div className="flex flex-col">
                <span className=" py-1">6am - 3pm</span>
                <span className="border-t border-gray-500 py-1">
                  3pm - 11pm
                </span>
              </div>
            </td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500"></td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500"></td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500"></td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500">
              <div className="flex flex-col">
                <span className=" py-1">6am - 3pm</span>
                <span className="border-t border-gray-500 py-1">
                  3pm - 11pm
                </span>
              </div>
            </td>
            <td className="text-center px-2 py-2 border-t border-l border-gray-500"></td>
            <td className="text-center px-2 py-2 border-t border-x border-gray-500"></td>
          </tr>
          {/* All the employees details */}
          <tr>
            <td className="px-4 py-4 text-start border-t border-l border-gray-500">
              <div className="flex flex-col font-semibold">
                <span>Jhon Doe</span>
                <span className="text-xs">5 shifts - 21.50 hours</span>
              </div>
            </td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-x border-gray-500"></td>
          </tr>

          <tr>
            <td className="px-4 py-4 text-start border-t border-l border-gray-500">
              <div className="flex flex-col font-semibold">
                <span>Harsh Tambade</span>
                <span className="text-xs">Not Scheduled</span>
              </div>
            </td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-l border-gray-500"></td>
            <td className="px-4 py-2 text-center border-t border-x border-gray-500"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
