import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface CharacterCustomization {
    accessories: Array<string>;
    characterType: CharacterType;
    color: string;
    props: Array<string>;
    emotionalTone: EmotionalTone;
}
export interface UserPreferences {
    favoriteEnvironments: Array<Environment>;
    preferredEmotionalTone: EmotionalTone;
    preferredColors: Array<string>;
    defaultAudioSettings: AudioSettings;
    favoriteCharacterTypes: Array<CharacterType>;
}
export type Time = bigint;
export interface AudioSettings {
    soundEffectsVolume: bigint;
    includeSoundEffects: boolean;
    narrationVolume: bigint;
    includeNarration: boolean;
}
export interface AnimationData {
    id: string;
    characterCustomization: CharacterCustomization;
    animationBlob: ExternalBlob;
    backgroundAudioBlob: ExternalBlob;
    createdAt: Time;
    videoBlob: ExternalBlob;
    narrationAudioBlob: ExternalBlob;
    sceneCustomization: SceneCustomization;
    audioSettings: AudioSettings;
    modelBlob: ExternalBlob;
    prompt: string;
    isAIGenerated: boolean;
    textureBlob: ExternalBlob;
}
export interface SceneCustomization {
    backgroundElements: Array<string>;
    environment: Environment;
}
export enum CharacterType {
    human = "human",
    animal = "animal",
    fantasyCreature = "fantasyCreature"
}
export enum EmotionalTone {
    sad = "sad",
    surprised = "surprised",
    happy = "happy",
    excited = "excited"
}
export enum Environment {
    city = "city",
    desert = "desert",
    space = "space",
    underwater = "underwater",
    forest = "forest"
}
export interface backendInterface {
    downloadVideo(_videoBlob: ExternalBlob): Promise<void>;
    generateAIAnimation(prompt: string, emotionalTone: EmotionalTone, audioSettings: AudioSettings, modelBlob: ExternalBlob, textureBlob: ExternalBlob, animationBlob: ExternalBlob, videoBlob: ExternalBlob, narrationAudioBlob: ExternalBlob, backgroundAudioBlob: ExternalBlob): Promise<AnimationData>;
    getAIGeneratedAnimations(): Promise<Array<AnimationData>>;
    getAllAnimations(): Promise<Array<AnimationData>>;
    getAnimation(id: string): Promise<AnimationData>;
    getUserPreferences(): Promise<UserPreferences>;
    isAIGenerated(animationId: string): Promise<boolean>;
    setUserPreferences(prefs: UserPreferences): Promise<void>;
}
