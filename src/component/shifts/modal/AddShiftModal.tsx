import React, { useEffect, useState } from "react";
import Dialog from "../../../common/Dialog";
import InputWithTopHeader from "../../../common/inputs/InputWithTopHeader";
import InputSelect from "../../../common/inputs/InputSelect";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputDate from "../../../common/inputs/InputDate";
import { FiClock } from "react-icons/fi";
import TextareaWithTopHeader from "../../../common/inputs/TextareaWithTopHeader";

const addShiftFormSchema = z.object({
  position: z.enum(["supervisor", "guard", "other"]),
  date: z.date().default(new Date()),
  start_time: z.string().min(2, { message: "Start time is required" }),
  end_time: z.string().min(2, { message: "End time is required" }),
  description: z.string().nullable().optional(),
});

export type AddShiftFormFields = z.infer<typeof addShiftFormSchema>;

const AddShiftModal = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const methods = useForm<AddShiftFormFields>({
    resolver: zodResolver(addShiftFormSchema),
  });

  const [shiftDate, setShiftDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (shiftDate) {
      methods.setValue("date", shiftDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftDate]);

  const onSubmit = async (data: AddShiftFormFields) => {
    console.log(data, "here is your data");
  };

  return (
    <Dialog
      opened={opened}
      setOpened={setOpened}
      title="Add Shift"
      size="80%"
      isFormModal
      positiveCallback={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputSelect
              label="Select Position"
              options={[
                { title: "Supervisor", value: "supervisor" },
                { title: "Guard", value: "guard" },
                { title: "Other", value: "other" },
              ]}
              register={methods.register}
              name="position"
              error={methods.formState.errors.position?.message}
            />

            <InputDate
              label="Date"
              value={shiftDate}
              setValue={setShiftDate}
              id="shift_date"
            />

            <InputWithTopHeader
              className="mx-0"
              label="Start time"
              tailIcon={<FiClock className="w-4 h-4" />}
              register={methods.register}
              name="start_time"
              error={methods.formState.errors?.start_time?.message}
            />

            <InputWithTopHeader
              className="mx-0"
              label="End time"
              tailIcon={<FiClock className="w-4 h-4" />}
              register={methods.register}
              name="end_time"
              error={methods.formState.errors?.end_time?.message}
            />
            <div className="col-span-2">
              <TextareaWithTopHeader
                title="Description"
                className="mx-0"
                register={methods.register}
                name="description"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default AddShiftModal;
