import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const BrainTreePaymentWebView = ({ onNonceRetrieved }) => {
  return (
    <View style={{ height: 450 }}>
      <Text style={{ fontSize: 30, fontWeight: "500" }}>
        BrainTree Payment Integration
      </Text>
      <WebView
        source={{ uri: `http://localhost:3000/braintree` }}
      
        onMessage={(event) => {
          onNonceRetrieved(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BrainTreePaymentWebView
        onNonceRetrieved={async (nonce) => {
          const response = await axios.post(
            `http://localhost:3000/createPaymentTransaction`,
            {
              amount: 10, //change to price gotten from your user
              nonce: nonce,
            }
          );
          const { isPaymentSuccessful, errorText } = await response.data;
          Alert.alert(
            isPaymentSuccessful
              ? "Payment successful"
              : `Payment error - ${errorText}`
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
