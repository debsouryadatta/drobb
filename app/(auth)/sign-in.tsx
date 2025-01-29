import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Toast from 'react-native-toast-message'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  const showButtonDisabled = () => {
    Toast.show({
      type: 'info',
      text1: 'Not available yet',
      text2: 'Try out with email and password',
      visibilityTime: 3000,
      autoHide: true,
    })
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={['#111111', '#111111', '#00d5be']}
        className="flex-1"
      >
        <View className="flex-1 px-5">
          <StatusBar style="light" />
          
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="mt-14 w-9 h-9 rounded-full bg-[#1A1A1A]/50 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={20} color="#666666" />
          </TouchableOpacity>

          <View className="mt-8">
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide">
              Welcome
            </Text>
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide mt-1">
              Back
            </Text>
            <Text className="text-[#666666] text-base mt-3">
              Please sign in to continue
            </Text>
          </View>

          <View className="space-y-5 mt-12">
            <View>
              <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                Email
              </Text>
              <View className="relative">
                <TextInput
                  className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                  placeholder="example@email.com"
                  placeholderTextColor="#666666"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{ fontWeight: '400' }}
                />
                <View className="absolute left-4 top-4">
                  <Ionicons name="mail-outline" size={20} color="#666666" />
                </View>
              </View>
            </View>

            <View>
              <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white pr-12 border border-[#333333] text-base pl-11"
                  placeholder="••••••••"
                  placeholderTextColor="#666666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={{ fontWeight: '400' }}
                />
                <View className="absolute left-4 top-4">
                  <Ionicons name="lock-closed-outline" size={20} color="#666666" />
                </View>
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#666666" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={onSignInPress}
            className="h-[52px] bg-gradient-to-r from-[#00d5be] to-[#00bcd4] rounded-xl items-center justify-center mt-8 shadow-lg shadow-cyan-500/20"
          >
            <Text className="text-white font-bold text-base">Sign in</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-6 space-x-1">
            <Text className="text-white">Don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-white font-extrabold">Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}