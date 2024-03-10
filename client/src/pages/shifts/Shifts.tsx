import { useState } from "react";
import AddShiftModal from "../../component/shifts/modal/AddShiftModal";

const Shifts = () => {
  const [createShiftDialog, setCreateShiftDialog] = useState(false);
  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex justify-between w-full p-4 rounded bg-primaryGold text-surface items-center">
        <span className="font-semibold text-xl">Shifts</span>

        <button
          onClick={() => setCreateShiftDialog(true)}
          className="bg-primary text-surface px-4 py-2 rounded"
        >
          Create Shift
        </button>
      </div>

      <AddShiftModal
        opened={createShiftDialog}
        setOpened={setCreateShiftDialog}
      />

      <table className="rounded overflow-hidden w-full">
        <thead className="bg-primary text-surface text-sm">
          <tr>
            <th className="uppercase px-4 py-2 w-[20%] text-center">Date</th>
            <th className="uppercase px-4 py-2 w-[20%] text-center">
              Start Time
            </th>
            <th className="uppercase px-4 py-2 w-[20%] text-center">
              End Time
            </th>
            <th className="uppercase px-4 py-2 w-[20%] text-center">
              Position
            </th>
            <th className="uppercase px-4 py-2 w-[20%] text-center">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-[#5856560f]">
          <tr
            onClick={() => setCreateShiftDialog(true)}
            className="cursor-pointer "
          >
            <td className="px-4 py-2 text-center">12/03/24</td>
            <td className="px-4 py-2 text-center">10:00 AM</td>
            <td className="px-4 py-2 text-center">06:00 PM</td>
            <td className="px-4 py-2 text-center">Guard</td>
            <td className="px-4 py-2 text-center">N/A</td>
          </tr>
          <tr
            onClick={() => setCreateShiftDialog(true)}
            className="cursor-pointer "
          >
            <td className="px-4 py-2 text-center">13/03/24</td>
            <td className="px-4 py-2 text-center">11:00 AM</td>
            <td className="px-4 py-2 text-center">07:00 PM</td>
            <td className="px-4 py-2 text-center">Supervisor</td>
            <td className="px-4 py-2 text-center">N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Shifts;
