import {
  Link as UILink,
  Navbar,
  Text,
  Button,
  Image,
  Dropdown,
  Loading,
  User,
} from "@nextui-org/react";

import NextLink from "next/link";

import { useEffect, useMemo, useState, forwardRef } from "react";
import { auth } from "@/src/services";
import { User as UserType } from "@/src/services/api/auth/user";
import { useRouter } from "next/router";

export default function UserLayout() {
  const router = useRouter(),
    [isLoaded, setLoaded] = useState(false),
    [userData, setUserData] = useState<UserType | null>(null),
    Link = forwardRef((props, ref: any) => (
      <UILink {...props} as={NextLink} ref={ref} />
    )),
    select = (path) => {
      const route = path.currentKey;

      switch (route) {
        case "logout":
          auth.user.logout();
          window.location.href = "/SignIn";
          break;
        case "profile":
          window.location.href = "/profile";
          break;
        default:
          break;
      }
    };
  useEffect(() => {
    if (auth.user.userInfo) {
      auth.user.getMe().then((user) => {
        setLoaded(true);

        if (user) {
          auth.user.refresh(user);
          setUserData(user as UserType);
        } else {
          auth.user.logout();
        }
      });
    } else {
      setLoaded(true);
    }
  }, []);

  const Navigation = useMemo(() => {
    if (isLoaded) {
      if (userData) {
        return (
          <Navbar.Content>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger
                  css={{
                    cursor: "pointer",
                    img: { cursor: "pointer" },
                    "&:hover": {
                      backgroundColor: "$accents0",
                    },
                    padding: "$5 $8",
                    borderRadius: "$pill",
                    transition: "$default",
                  }}
                >
                  <User
                    bordered
                    as="button"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    name={auth.user?.userInfo?.info?.name
                      .split(" ")
                      .splice(0, 2)
                      .join(" ")}
                    description={auth.user?.userInfo?.info?.username}
                    zoomed
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu onSelectionChange={select} selectionMode="single">
                <Dropdown.Item
                  key="setting"
                  color="secondary"
                  css={{ height: "$18", backgroundColor: "$secondaryLight" }}
                >
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {auth.user?.userInfo?.info?.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="profile" withDivider>
                  Profile
                </Dropdown.Item>

                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        );
      } else {
        return (
          <Navbar.Content>
            <Navbar.Item>
              {router.asPath === "/SignIn" ? (
                "Login"
              ) : (
                <Button as={Link} href="/SignIn" auto flat>
                  Login
                </Button>
              )}
            </Navbar.Item>
            <Navbar.Item>
              {router.asPath === "/SignUp" ? (
                "Sign Up"
              ) : (
                <Button as={Link} href="/SignUp" auto flat>
                  Sign Up
                </Button>
              )}
            </Navbar.Item>
          </Navbar.Content>
        );
      }
    } else {
      return (
        <Navbar.Content>
          <Loading color={"primary"} />
        </Navbar.Content>
      );
    }
  }, [isLoaded, userData, router.asPath]);
  return (
    <>
      {userData && (
        <Navbar.Content hideIn="xs" variant={"underline-rounded"}>
          <Navbar.Link
            isActive={router.asPath == "/" ? true : false}
            isFocusVisible={"false"}
            as={Link}
            href="/"
          >
            Home
          </Navbar.Link>
          {/* <Navbar.Link
            as={Link}
            isFocusVisible={"false"}
            isActive={router.asPath == "/anaesthetic" ? true : false}
            href="/anaesthetic"
          >
            Anaesthetic
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            isFocusVisible={"false"}
            isActive={router.asPath == "/intensive" ? true : false}
            href="/intensive"
          >
            Intensive Care
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            isFocusVisible={"false"}
            isActive={router.asPath == "/procedure" ? true : false}
            href="/procedure"
          >
            Procedure
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            isFocusVisible={"false"}
            isActive={router.asPath == "/rotation" ? true : false}
            href="/rotation"
          >
            Rotation
          </Navbar.Link> */}
        </Navbar.Content>
      )}
      {Navigation}
    </>
  );
}
