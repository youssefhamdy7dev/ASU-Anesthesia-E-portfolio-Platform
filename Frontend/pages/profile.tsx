import Loading from "@/src/components/Loading";
import { auth } from "@/src/services";
import { User } from "@/src/services/api/auth/user";
import { Button, Card, Spacer, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import { useEffect, useState } from "react";

export default function Profile() {
  var [user, setUser] = useState<null | User["info"]>(null);
  useEffect(() => {
    setUser(auth.user.userInfo?.info);
  }, []);
  if (!user) {
    return <Loading />;
  }
  return (
    <>
      <Text
        size={24}
        weight="bold"
        css={{
          textAlign: "center",
          my: "$13",
        }}
      >
        Welcome to your profile page,{" "}
        {user?.name.split(" ").splice(0, 1).join(" ")}!
      </Text>
      <Card
        css={{
          paddingRight: "$20",
          paddingLeft: "$20",
          paddingTop: "$10",
          paddingBottom: "$10",
        }}
      >
        <Box
          as={"ul"}
          css={{
            listStyle: "none",
            $$listBorder: "2px solid $colors$gray200",
            border: "$$listBorder",
            m: 0,
            p: 0,
            borderRadius: "5px",
            overflow: "hidden",
            ">li": {
              d: "flex",
              "&:nth-child(odd) > div": {
                backgroundColor: "$gray100",
              },

              "&:not(:first-of-type)": {
                borderTop: "$$listBorder",
              },
              ">div": {
                d: "inline-block",
                padding: "$8",

                "&:first-of-type": {
                  borderRight: "$$listBorder",
                  fontWeight: "500",
                  width: "20%",
                  d: "flex",
                  alignItems: "center",
                },
                "&:last-of-type": {
                  width: "100%",
                },
                "&:last-of-type ul": {
                  p: "0 $10",
                  overFlow: "hidden",
                  borderRadius: "5px",
                  width: "auto",
                  li: {
                    padding: "$5",
                    "&:nth-child(odd)": {
                      backgroundColor: "$gray300",
                      borderRadius: "5px",
                    },
                  },
                },
              },
            },
          }}
        >
          <Box as={"li"}>
            <Box>Name</Box>
            <Box>{user?.name}</Box>
          </Box>
          <Box as={"li"}>
            <Box>Username</Box>
            <Box>{user?.username}</Box>
          </Box>
          <Box as={"li"}>
            <Box>Email</Box>
            <Box>{user?.email}</Box>
          </Box>
          <Box as={"li"}>
            <Box>Gender</Box>
            <Box>{user?.gender == "m" ? "Male" : "Female"}</Box>
          </Box>
          <Box as={"li"}>
            <Box>Residency Year</Box>
            <Box>
              {user?.residencyYear == 1
                ? "Residency Year 1"
                : user?.residencyYear == 2
                ? "Residency Year 2"
                : "Residency Year 3"}
            </Box>
          </Box>
        </Box>
        <Spacer y={0.8} />
        <Button
          auto
          shadow
          css={{
            width: "100px",
            borderRadius: "$xs",
            border: "$space$1 solid transparent",
            background: "$green700",
            color: "$green100",
            height: "$12",
            boxShadow: "$md",
            "&:hover": {
              background: "$green100",
              color: "$green700",
            },
            "&:active": {
              background: "$green200",
            },
            "&:focus": {
              borderColor: "$green400",
            },
          }}
        >
          Update
        </Button>
      </Card>
    </>
  );
}
