type WithAudioFeedback = {
    audioFeedback: true;
    voiceFeedback: false;
};
type WithVoiceFeedback = {
    voiceFeedback: true;
    audioFeedback: false;
};

export type FretboardMasteryProps = {
    onAudioFeedbackChange?: (value: boolean) => void;
    onVoiceFeedbackChange?: (value: boolean) => void;
} & (WithAudioFeedback | WithVoiceFeedback);
