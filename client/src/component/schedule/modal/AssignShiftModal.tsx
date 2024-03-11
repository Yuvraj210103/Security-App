import React from "react";
import Dialog from "../../../common/Dialog";
import { Shift, User } from "../../../pages/schedule/Schedule";
import dayjs from "dayjs";

const AssignShiftModal = ({
  opened,
  setOpened,
  selectedEmp,
  selectedEmpDate,
  availableShifts,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmp: User | null;
  selectedEmpDate: string | null;
  availableShifts: Shift[];
}) => {
  return (
    <Dialog
      opened={opened}
      setOpened={setOpened}
      title="Add Employee"
      size="350px"
      isFormModal
    >
      <div className="flex flex-col">
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold ">Employee Name :</span>{" "}
            {selectedEmp?.first_name} {selectedEmp?.last_name}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Date :</span>{" "}
            {dayjs(selectedEmpDate).format("MMM-DD - ddd")}
          </div>
        </div>
        <div className="font-semibold mt-4">Assign available shifts</div>
        <div className="flex flex-col">
          {availableShifts.map((data) => {
            return (
              <label
                key={data._id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input type="checkbox" />
                <div>
                  {data.start_time} - {data.end_time}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default AssignShiftModal;
