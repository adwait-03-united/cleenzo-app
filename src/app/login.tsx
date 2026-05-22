import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);

  async function sendOTP() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: "+91" + phone,
    });
    if (error) Alert.alert("Error", error.message);
    else setStep("otp");
    setLoading(false);
  }

  async function verifyOTP() {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: "+91" + phone,
      token: otp,
      type: "sms",
    });
    if (error) Alert.alert("Wrong OTP", error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cleenzo</Text>
      <Text style={styles.tagline}>Trusted cleaning in Nashik</Text>

      {step === "phone" ? (
        <>
          <Text style={styles.label}>Enter your mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="9876543210"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={sendOTP}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP sent to +91{phone}</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={verifyOTP}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#06b6d4",
    textAlign: "center",
  },
  tagline: { color: "#888", textAlign: "center", marginBottom: 40 },
  label: { fontSize: 15, color: "#333", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#06b6d4",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
