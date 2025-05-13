import { createFileRoute } from "@tanstack/react-router";
import { Text, Button, Grid, TextField, Box, Heading } from "@radix-ui/themes";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (typeof email === "string") {
      try {
        const res = await fetch(
          `https://script.google.com/macros/s/AKfycbxPa-0OrNGjsAN7Wo1Y4qKIieRrjXVgoqu8JOWGd0HM50FZLXmxF0zAMubNq8Y2OfCywg/exec`,
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to submit");

        alert("You're on the list!");
      } catch (err) {
        alert("Submission failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <>
      <Box mb="2">
        <img
          src="/den_logo.svg"
          alt="den logo"
          style={{ width: 48, height: 48 }}
        />
        <Heading>den.computer</Heading>
      </Box>

      <Box
        style={{
          background: "var(--gray-a2)",
          border: "1px dashed var(--gray-a7)",
        }}
        maxWidth="400px"
        minWidth="300px"
        p="4"
      >
        <form onSubmit={handleSubmit}>
          <Grid gap="3">
            <Heading size="3">Join the waitlist</Heading>
            <Text>
              Enter your email address and we'll let you know when your spot is
              ready.
            </Text>
            <TextField.Root
              name="email"
              type="email"
              size="2"
              placeholder="Email address"
            />
            <Button type="submit" size="2">
              Join the waitlist
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
}
