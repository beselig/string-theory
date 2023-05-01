import { Combobox } from "@/components/Combobox";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, QuestionMarkIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import * as TB from "@radix-ui/react-toolbar";
import { GiGuitarBassHead } from "react-icons/gi";
import { RiUserVoiceLine } from "react-icons/ri";
import { Rules } from "./components";
import { ModeItem, modes } from "./data";

export type AudioFeedback = "sample" | "voice" | "off";
type ToolbarProps = {
    mode: ModeItem;
    onModeChange: (mode: ModeItem) => void;
    onAudioFeedbackChange: (value: AudioFeedback) => void;
    audioFeedbackValue: AudioFeedback;
};
export const Toolbar = ({
    mode,
    onModeChange,
    onAudioFeedbackChange,
    audioFeedbackValue,
}: ToolbarProps) => {
    return (
        <DefaultToolbarRoot aria-label="Exercise Settings">
            <DefaultToolbarToggleGroup
                type="single"
                aria-label="Audio Feedback"
                value={audioFeedbackValue}
                onValueChange={onAudioFeedbackChange}
            >
                <DefaultToolbarItem value="sample" aria-label="Guitar">
                    <BassHeadIcon />
                </DefaultToolbarItem>
                <DefaultToolbarItem value="voice" aria-label="Voice">
                    <RiUserVoiceLine />
                </DefaultToolbarItem>
                <DefaultToolbarItem value="off" aria-label="No Audio Feedback">
                    <SpeakerOffIcon />
                </DefaultToolbarItem>
            </DefaultToolbarToggleGroup>
            <TB.Separator className="mx-[10px] h-full w-[1px] bg-gray-300" />
            <Combobox value={mode} items={modes} onChange={(v) => onModeChange(v as ModeItem)} />

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <TB.ToolbarButton
                        asChild
                        className="ml-auto h-7 w-7 cursor-pointer rounded-md bg-slate-100 p-1.5 outline-none transition-colors hover:bg-slate-200 active:bg-slate-300"
                    >
                        <QuestionMarkIcon />
                    </TB.ToolbarButton>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black" />
                    <Dialog.Content className=" data-[state=open]:animate-contentShow fixed inset-0 overflow-auto bg-white p-6 text-black shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-black dark:text-white sm:h-screen sm:w-screen">
                        <Dialog.Title asChild>
                            <h3 className="m-0 mb-5 border-b-2 pb-5 uppercase leading-none">
                                How to play
                            </h3>
                        </Dialog.Title>
                        <Rules />
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-6 top-6 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full bg-white text-black focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </DefaultToolbarRoot>
    );
};

const DefaultToolbarRoot = (props: TB.ToolbarProps) => (
    <TB.Root
        {...props}
        className="flex max-h-12 w-full items-center gap-2 rounded-md bg-white p-2 text-slate-950"
    />
);
const DefaultToolbarToggleGroup = (props: TB.ToggleGroupProps) => (
    <TB.ToggleGroup {...props} className="flex gap-1" />
);
const DefaultToolbarItem = (props: TB.ToggleGroupItemProps) => (
    <TB.ToggleItem
        {...props}
        className="flex h-7 w-7 items-center justify-around rounded-md border border-transparent data-[state=on]:border-slate-300 data-[state=on]:bg-slate-100"
    />
);

// The icon is ugly and not centered. The className is a hack to make it less atrocius.
const BassHeadIcon = () => <GiGuitarBassHead className="-ml-0.5 mr-0.5" />;
