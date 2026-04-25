import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur";

export function Message({role, message}){
  if (role === "user"){
    return (
      <View style={styles.userMessage}>
        <Text style={styles.messageText}>
          {message}
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.modelMessage}>
      <Text style={styles.messageText}>
        {message}
      </Text>
    </View>
  )
}


export default function App() {
  return (
    <LinearGradient
      colors={['#c4c3c3ff','#aeaeaeff']}
      style= {styles.background}
    >
      <View
        style={[styles.topBubble]}
      ></View>
      <View
        style={[styles.bottomBubble]}
      ></View>

      <View
        style = {styles.outer}
      >
        {/* the header with model information */}
       <BlurView
        style  = {styles.modelHeader}
        tint="light"
       >
        <View>
           <Text style={styles.nameText}>
            Nemo AI
          </Text>
        </View>
        <View>
          <Text>
            Gemma4 - E2B
          </Text>
        </View>
       </BlurView>
       {/* the middle chat information */}
       <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={styles.messagesContent}
       >
        <Message message="yeehaw bitch" role="model" />
        <Message message="How can I help you?" role="user" />
        <Message message="yeehaw bitch" role="model" />
        <Message message="How can I help you?" role="user" />
        <Message message="yeehaw bitch" role="model" />
        <Message message="How can I help you?" role="user" />
        <Message message="yeehaw bitch" role="model" />
        <Message message="How can I help you?" role="user" />
       </ScrollView>

       {/* the chat input box  */}
       <BlurView
        style={styles.inputContainer}
        tint="light"
       >
         <Text style={styles.inputPlaceholder}>
           Type a message...
         </Text>
       </BlurView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
   modelHeader: {
     position: "absolute",
     top: 60,
     left: 30,
     right: 30,
     height: 60,
     width: "70vw",
     backgroundColor: "rgba(255, 255, 255, 0)",
     borderColor: "#080707",
     borderWidth: 1,
     borderRadius: 50,
     paddingHorizontal: 10,
     flexDirection:"row",
     alignItems: "center",
     justifyContent: "space-between",
     shadowColor: "#000",
     shadowOffset: { width: 5, height: 10 },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 5,
     overflow: "hidden",
   },
   nameText: {
     textAlign: "center",
     fontSize :20,
     fontWeight: "500",
     color: "#000000"
   },
  background: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
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
    color: "#000000",
    fontSize: 14,
  },
  messageContainer:{
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingBottom: 10,
  },
  inputContainer: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
    marginHorizontal: 30,
  },
  inputPlaceholder: {
    color: "#333",
    fontSize: 14,
  },  
  topBubble : { // fucking hell its done.
    position:'absolute',
    top: 10,
    right : -80,
    borderRadius : 100,
    opacity: 0.9,
    backgroundColor: "#ffffff00",// FF9A73
    shadowColor: "#ff4800ff",
    shadowOffset: { width: 100, height: 100 },  // 0,0 = spreads in all directions
    shadowOpacity: 1,                      // 0 to 1
    shadowRadius: 100,                        // large = soft wide glow
    // Android
    elevation: 20,
    height:180,
    width:180,
  },
  bottomBubble : {
    position:'absolute',
    bottom: -60,
    left : -80,
    borderRadius : 100,
    opacity: 0.9,
    backgroundColor: "#ffffff00",// FF9A73
    shadowColor: "#1c56f6ff",
    shadowOffset: { width: 100, height: 100 },  // 0,0 = spreads in all directions
    shadowOpacity: 1,                      // 0 to 1
    shadowRadius: 100,                        // large = soft wide glow
    // Android
    elevation: 20,
    height:180,
    width:180,
  }
});
