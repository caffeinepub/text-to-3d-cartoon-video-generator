import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Storage "blob-storage/Storage";

module {
  // Old data types
  type OldCharacterType = {
    #animal;
    #human;
    #fantasyCreature;
  };

  type OldEnvironment = {
    #space;
    #forest;
    #city;
    #underwater;
    #desert;
  };

  type OldCharacterCustomization = {
    characterType : OldCharacterType;
    color : Text;
    props : [Text];
    accessories : [Text];
  };

  type OldSceneCustomization = {
    environment : OldEnvironment;
    backgroundElements : [Text];
  };

  type OldAnimationData = {
    id : Text;
    prompt : Text;
    characterCustomization : OldCharacterCustomization;
    sceneCustomization : OldSceneCustomization;
    createdAt : Time.Time;
    isAIGenerated : Bool;
    modelBlob : Storage.ExternalBlob;
    textureBlob : Storage.ExternalBlob;
    animationBlob : Storage.ExternalBlob;
    videoBlob : Storage.ExternalBlob;
  };

  type OldUserPreferences = {
    favoriteCharacterTypes : [OldCharacterType];
    favoriteEnvironments : [OldEnvironment];
    preferredColors : [Text];
  };

  // Old persistent actor state
  type OldActor = {
    animations : Map.Map<Text, OldAnimationData>;
    userPreferences : Map.Map<Principal, OldUserPreferences>;
  };

  // New data types
  type EmotionalTone = {
    #happy;
    #sad;
    #excited;
    #surprised;
  };

  type AudioSettings = {
    includeNarration : Bool;
    includeSoundEffects : Bool;
    narrationVolume : Int;
    soundEffectsVolume : Int;
  };

  type CharacterCustomization = {
    characterType : OldCharacterType;
    color : Text;
    props : [Text];
    accessories : [Text];
    emotionalTone : EmotionalTone;
  };

  type AnimationData = {
    id : Text;
    prompt : Text;
    characterCustomization : CharacterCustomization;
    sceneCustomization : OldSceneCustomization;
    audioSettings : AudioSettings;
    createdAt : Time.Time;
    isAIGenerated : Bool;
    modelBlob : Storage.ExternalBlob;
    textureBlob : Storage.ExternalBlob;
    animationBlob : Storage.ExternalBlob;
    videoBlob : Storage.ExternalBlob;
    narrationAudioBlob : Storage.ExternalBlob;
    backgroundAudioBlob : Storage.ExternalBlob;
  };

  type UserPreferences = {
    favoriteCharacterTypes : [OldCharacterType];
    favoriteEnvironments : [OldEnvironment];
    preferredColors : [Text];
    preferredEmotionalTone : EmotionalTone;
    defaultAudioSettings : AudioSettings;
  };

  type NewActor = {
    animations : Map.Map<Text, AnimationData>;
    userPreferences : Map.Map<Principal, UserPreferences>;
  };

  // Empty blob creator
  func defaultBlob() : Blob {
    Blob.fromArray([]);
  };

  // Migration function run by the system on upgrade
  public func run(old : OldActor) : NewActor {
    // Migrate animations
    let newAnimations = old.animations.map<Text, OldAnimationData, AnimationData>(
      func(_id, oldAnimation) {
        {
          oldAnimation with
          characterCustomization = {
            oldAnimation.characterCustomization with
            emotionalTone = #happy;
          };
          audioSettings = {
            includeNarration = true;
            includeSoundEffects = true;
            narrationVolume = 75;
            soundEffectsVolume = 75;
          };
          narrationAudioBlob = defaultBlob();
          backgroundAudioBlob = defaultBlob();
        };
      }
    );

    // Migrate user preferences
    let newUserPreferences = old.userPreferences.map<Principal, OldUserPreferences, UserPreferences>(
      func(_principal, oldPrefs) {
        {
          oldPrefs with
          preferredEmotionalTone = #happy;
          defaultAudioSettings = {
            includeNarration = true;
            includeSoundEffects = true;
            narrationVolume = 75;
            soundEffectsVolume = 75;
          };
        };
      }
    );

    // Return new persistent state
    {
      animations = newAnimations;
      userPreferences = newUserPreferences;
    };
  };
};
