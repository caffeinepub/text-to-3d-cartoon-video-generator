import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Enums and Types
  type CharacterType = {
    #animal;
    #human;
    #fantasyCreature;
  };

  type Environment = {
    #space;
    #forest;
    #city;
    #underwater;
    #desert;
  };

  type EmotionalTone = {
    #happy;
    #sad;
    #excited;
    #surprised;
  };

  type CharacterCustomization = {
    characterType : CharacterType;
    color : Text;
    props : [Text];
    accessories : [Text];
    emotionalTone : EmotionalTone;
  };

  type SceneCustomization = {
    environment : Environment;
    backgroundElements : [Text];
  };

  type AudioSettings = {
    includeNarration : Bool;
    includeSoundEffects : Bool;
    narrationVolume : Int;
    soundEffectsVolume : Int;
  };

  type AnimationData = {
    id : Text;
    prompt : Text;
    characterCustomization : CharacterCustomization;
    sceneCustomization : SceneCustomization;
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

  module AnimationData {
    public func compare(a : AnimationData, b : AnimationData) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  type UserPreferences = {
    favoriteCharacterTypes : [CharacterType];
    favoriteEnvironments : [Environment];
    preferredColors : [Text];
    preferredEmotionalTone : EmotionalTone;
    defaultAudioSettings : AudioSettings;
  };

  // Persistent Data Structures
  let animations = Map.empty<Text, AnimationData>();
  let userPreferences = Map.empty<Principal, UserPreferences>();

  // Helper Functions
  func getDefaultCharacterCustomization() : CharacterCustomization {
    {
      characterType = #human;
      color = "blue";
      props = [];
      accessories = [];
      emotionalTone = #happy;
    };
  };

  func getDefaultSceneCustomization() : SceneCustomization {
    {
      environment = #forest;
      backgroundElements = [];
    };
  };

  func getDefaultAudioSettings() : AudioSettings {
    {
      includeNarration = true;
      includeSoundEffects = true;
      narrationVolume = 75;
      soundEffectsVolume = 75;
    };
  };

  // User Preferences Management
  public shared ({ caller }) func setUserPreferences(prefs : UserPreferences) : async () {
    userPreferences.add(caller, prefs);
  };

  public query ({ caller }) func getUserPreferences() : async UserPreferences {
    switch (userPreferences.get(caller)) {
      case (null) { Runtime.trap("User preferences not found") };
      case (?prefs) { prefs };
    };
  };

  // Animation Management
  public query ({ caller }) func getAnimation(id : Text) : async AnimationData {
    switch (animations.get(id)) {
      case (null) { Runtime.trap("Animation not found") };
      case (?animation) { animation };
    };
  };

  public query ({ caller }) func getAllAnimations() : async [AnimationData] {
    animations.values().toArray().sort();
  };

  // AI-Powered Animation Generation
  public shared ({ caller }) func generateAIAnimation(
    prompt : Text,
    emotionalTone : EmotionalTone,
    audioSettings : AudioSettings,
    modelBlob : Storage.ExternalBlob,
    textureBlob : Storage.ExternalBlob,
    animationBlob : Storage.ExternalBlob,
    videoBlob : Storage.ExternalBlob,
    narrationAudioBlob : Storage.ExternalBlob,
    backgroundAudioBlob : Storage.ExternalBlob,
  ) : async AnimationData {
    let id = Time.now().toText();
    let characterCustomization = {
      characterType = #human;
      color = "blue";
      props = [];
      accessories = [];
      emotionalTone;
    };
    let animationData : AnimationData = {
      id;
      prompt;
      characterCustomization;
      sceneCustomization = getDefaultSceneCustomization();
      audioSettings;
      createdAt = Time.now();
      isAIGenerated = true;
      modelBlob;
      textureBlob;
      animationBlob;
      videoBlob;
      narrationAudioBlob;
      backgroundAudioBlob;
    };

    animations.add(id, animationData);
    animationData;
  };

  // Check if animation is AI-generated
  public query ({ caller }) func isAIGenerated(animationId : Text) : async Bool {
    switch (animations.get(animationId)) {
      case (null) { false };
      case (?animation) { animation.isAIGenerated };
    };
  };

  // Filter AI-generated animations
  public query ({ caller }) func getAIGeneratedAnimations() : async [AnimationData] {
    let aiAnimations = animations.filter(
      func(_id, animation) {
        animation.isAIGenerated;
      }
    );
    aiAnimations.values().toArray().sort();
  };

  // No-Op Download Video Function (Frontend only)
  public query ({ caller }) func downloadVideo(_videoBlob : Storage.ExternalBlob) : async () {
    Runtime.trap("Video download must be performed via the frontend's native download support");
  };
};
