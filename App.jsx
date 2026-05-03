import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, Button, Alert } from "react-native";
import { useFonts, GeistMono_400Regular } from "@expo-google-fonts/geist-mono";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, { Defs, RadialGradient, Stop, Rect, Circle, Filter, FeGaussianBlur } from "react-native-svg";
import { useRef, useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FONT_FAMILY = "GeistMono_400Regular";

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
            <Stop offset="10%"   stopColor="#FF0000" stopOpacity="1" />
            <Stop offset="90%" stopColor="#FF6B3E" stopOpacity="1" />
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


// ── App ────────────────────────────────────────────────────────────
export default function App() {
  const messageContainer = useRef(null)



  const [messages, setMessages] = useState([{role:"model",message:"How can i help you today? \n - Nemo"}])
  const [inputText, setInputText] = useState("")

  function Message() {
    return messages.map((item,idx)=>{
      if (item.role === "user") {
        return (
          <View style={styles.userMessage} key={idx}>
            <Text style={[styles.messageText, { color: "#1a1a1a" }]}>{item.message}</Text>
          </View>
        );
      }
      return (
        <View style={styles.modelMessage} key={idx}>
          <Text style={[styles.messageText, { color: "#ffffff" }]}>{item.message}</Text>
        </View>
      )
    })
  }
  function addMessage(){
    if (!inputText.trim()) return
    setMessages(prev => [...prev, {role:"user",message:inputText}])
    setInputText("")
  }
  const [fontsLoaded] = useFonts({
    GeistMono_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#f3f3f3ff", "#dcdcdcff"]} style={styles.background}>
      <StatusBar style="dark" />

      {/* Bubbles — offset by size/2 since SVG canvas is 2× */}
      <GlowBubble color="#f28e6904" glowColor="#f5ccbbff" size={180} style={{ top: -90, right: -180 }} />
      <GlowBubble color="#4b8bf106" glowColor="#94adf171" size={180} style={{ bottom: -90, left: -200 }} />

      <View style={styles.outer}>
        {/* Header */}
        <BlurView style={styles.modelHeader} tint="light" intensity={60}>
          <GradientText
            text="Nemo AI"
            width={120}
            height={36}
            style={styles.brandText}
          />
          <Text style={styles.modelLabel}>Gemma4 - E2B</Text>
        </BlurView>

        {/* Messages */}
        <ScrollView
          nativeID="message-container"
          ref={messageContainer}
          style={styles.messageContainer}
          contentContainerStyle={styles.messagesContent}
        >
          <Message/>
        </ScrollView>

        {/* Input */}
        <BlurView style={styles.inputContainer} tint="light" intensity={60}>
          <TextInput
            style={styles.textElement}
            value={inputText}
            onChangeText={setInputText}
            placeholder="type a message"
            placeholderTextColor="#999"
          />
          <View
          style = {{flex:1, flexDirection:"row", alignContent:"center", justifyContent:"center", gap:10}}
          >
            <View
              style = {{flex:1, flexDirection:"row", paddingTop:2,  gap:10}}
            >
              <Text style={styles.menuText}>
                Menu
              </Text>
              <Text style={styles.menuText}>
                Upload
              </Text>
              <Text style={styles.menuText}>
                Voice
              </Text>
              <Text style={styles.menuText}>
                Video
              </Text>
            </View>
            <View
              style = {{alignContent: "center"}}
            >
              <Button
              style= {styles.sendButton}
              onPress={addMessage}
              title="Send"
              >
              </Button>
            </View>
          </View>
        </BlurView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  brandText: {
    fontFamily: FONT_FAMILY,
    fontSize: 20,
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
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    color: "#444",
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
    fontFamily: FONT_FAMILY,
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
    height: 100,
    width: SCREEN_WIDTH - 60,   // ← fixed: was "60vw" which = 0
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical:0,
    flexDirection: "column",
    alignItems: "start",
    overflow: "hidden",
    gap:10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(222, 78, 0, 0.34)",
  },
  textElement: {
    flex: 1,
    fontFamily: FONT_FAMILY,
    color: "#333",
    fontSize: 14,
  },
  menuText: {
    fontFamily: FONT_FAMILY,
  },
  sendButton:{
    fontFamily : FONT_FAMILY,
    textAlign:"center",
    color :"#FF6B3E",
    fontSize: 15
  }
});
