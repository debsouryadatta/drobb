import { Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileDrawer from '@/components/profile-drawer';
import FriendsDrawer from '@/components/friends-drawer';
import RequestsReceivedDrawer from '@/components/requests-received-drawer';
import RequestsSentDrawer from '@/components/requests-sent-drawer';
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const router = useRouter();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isFriendsDrawerVisible, setIsFriendsDrawerVisible] = useState(false);
    const [isRequestsReceivedDrawerVisible, setIsRequestsReceivedDrawerVisible] = useState(false);
    const [isRequestsSentDrawerVisible, setIsRequestsSentDrawerVisible] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View className="flex-row justify-center items-center mt-4">
                <Text className="text-black text-2xl font-extrabold ml-4">Profile</Text>
            </View>

            {/* Profile Info */}
            <View className="px-4 py-4">
                <View className="bg-gray-100 rounded-xl p-4">
                    <Text className="text-black text-lg font-medium">Debsourya Datta</Text>
                    <Text className="text-gray-500">debsouryadatta@gmail.com</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View className="px-4 bg-gray-100 mx-4 rounded-xl">
                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2" onPress={() => router.push("/profile/pastorder")}>
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="cube-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Past Orders</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="people-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Share With a Friend</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="alert-circle-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Report an Error</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="call-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Talk to a Founder</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="pencil-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Edit your Measurements</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="close-circle-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Brand Blacklist</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="star-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Drop a Rating</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-gray-100 rounded-xl px-2">
                    <View className="w-8 h-8 items-center justify-center">
                        <Ionicons name="share-social-outline" size={24} color="#000" />
                    </View>
                    <Text className="text-black ml-3">Follow our Socials</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            </View>

            {/* Delete Account Button */}
            <View className="px-4 mt-4">
                <TouchableOpacity className="bg-black py-4 rounded-lg">
                    <Text className="text-white text-center font-medium">Delete Account</Text>
                </TouchableOpacity>
            </View>

            {/* Drawers */}
            <ProfileDrawer 
                isVisible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                currentName="Poorv Chovatia"
                currentBio=""
                currentImage=""
                onSave={(name, bio, image) => {
                    console.log('Saving profile:', { name, bio, image });
                }}
            />

            <FriendsDrawer 
                isVisible={isFriendsDrawerVisible}
                onClose={() => setIsFriendsDrawerVisible(false)}
            />

            <RequestsReceivedDrawer 
                isVisible={isRequestsReceivedDrawerVisible}
                onClose={() => setIsRequestsReceivedDrawerVisible(false)}
            />

            <RequestsSentDrawer 
                isVisible={isRequestsSentDrawerVisible}
                onClose={() => setIsRequestsSentDrawerVisible(false)}
            />
        </SafeAreaView>
    );
}