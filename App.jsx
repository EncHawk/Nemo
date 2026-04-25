import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, { Defs, RadialGradient, Stop, Rect, Circle, Filter, FeGaussianBlur } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ── Gradient Text (for "Nemo AI") ──────────────────────────────────
function GradientText({ text, style, width = 120, height = 36 }) {
  return (
    <MaskedView
      style={{ width, height }}
      maskElement={
        <View style={{ flex: 1, backgroundColor: "transparent", justifyContent: "center" }}>
          <Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>
        </View>
      }
    >
      <Svg width={width} height={height}>
        <Defs>
          <RadialGradient id="nemo" cx="50%" cy="50%" rx="55%" ry="80%" fx="50%" fy="50%">
            <Stop offset="0%"   stopColor="#FF0000" stopOpacity="1" />
            <Stop offset="50%"  stopColor="#FF1500" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FF5500" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect width={width} height={height} fill="url(#nemo)" />
      </Svg>
    </MaskedView>
  );
}

// ── Glow Bubble (replaces your invisible Views) ────────────────────
function GlowBubble({ color, glowColor, size = 180, style }) {
  const id = color.replace("#", "");
  return (
    <Svg width={size * 2} height={size * 2} style={[{ position: "absolute" }, style]}>
      <Defs>
        <RadialGradient id={`grad-${id}`} cx="50%" cy="50%" r="50%">
          <Stop offset="0%"   stopColor={color} stopOpacity="0.85" />
          <Stop offset="60%"  stopColor={color} stopOpacity="0.35" />
          <Stop offset="100%" stopColor={color} stopOpacity="0"    />
        </RadialGradient>
        <Filter id={`blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <FeGaussianBlur stdDeviation="18" />
        </Filter>
      </Defs>
      {/* glow layer */}
      <Circle
        cx={size} cy={size} r={size * 0.6}
        fill={glowColor}
        opacity={0.55}
        filter={`url(#blur-${id})`}
      />
      {/* orb */}
      <Circle
        cx={size} cy={size} r={size * 0.45}
        fill={`url(#grad-${id})`}
      />
    </Svg>
  );
}

// ── Message ────────────────────────────────────────────────────────
export function Message({ role, message }) {
  if (role === "user") {
    return (
      <View style={styles.userMessage}>
        <Text style={[styles.messageText, { color: "#1a1a1a" }]}>{message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.modelMessage}>
      <Text style={[styles.messageText, { color: "#ffffff" }]}>{message}</Text>
    </View>
  );
}

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LinearGradient colors={["#f3f3f3ff", "#dcdcdcff"]} style={styles.background}>

      {/* Bubbles — offset by size/2 since SVG canvas is 2× */}
      <GlowBubble color="#fa683304" glowColor="#fa9973ff" size={180} style={{ top: -90, right: -180 }} />
      <GlowBubble color="#0062ff06" glowColor="#0044ff71" size={180} style={{ bottom: -90, left: -200 }} />

      <View style={styles.outer}>
        {/* Header */}
        <BlurView style={styles.modelHeader} tint="light" intensity={60}>
          <GradientText
            text="Nemo AI"
            width={120}
            height={36}
            style={{ fontSize: 20, fontWeight: "600" }}
          />
          <Text style={styles.modelLabel}>Gemma4 - E2B</Text>
        </BlurView>

        {/* Messages */}
        <ScrollView
          style={styles.messageContainer}
          contentContainerStyle={styles.messagesContent}
        >
          <Message message="yeehaw bitch"       role="model" />
          <Message message="How can I help you?" role="user"  />
          <Message message="yeehaw bitch"       role="model" />
          <Message message="How can I help you?" role="user"  />
          <Message message="yeehaw bitch"       role="model" />
        </ScrollView>

        {/* Input */}
        <BlurView style={styles.inputContainer} tint="light" intensity={60}>
          <TextInput
            style={styles.inputPlaceholder}
            placeholder="type a message"
            placeholderTextColor="#999"
          />
        </BlurView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  outer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modelHeader: {
    position: "absolute",
    zIndex: 100,
    top: 55,
    left: 30,
    right: 30,
    height: 60,
    borderColor: "rgba(0,0,0,0.15)",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",         // required for BlurView to clip correctly
  },
  modelLabel: {
    fontSize: 14,
    color: "#444",
    fontWeight: "400",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#EBAB66",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderBottomRightRadius: 5,
    maxWidth: "80%",
    marginBottom: 10,
  },
  modelMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#406EED",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 5,
    maxWidth: "80%",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
  },
  messageContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
  },
  messagesContent: {
    flexGrow: 1,
    paddingTop: 140,      // clears the absolute header
    paddingBottom: 20,
  },
  inputContainer: {
    height: 50,
    width: SCREEN_WIDTH - 60,   // ← fixed: was "60vw" which = 0
    borderRadius: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  inputPlaceholder: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
});