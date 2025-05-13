import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Input,
  Stack,
  Typography,
} from "@mui/material";

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
    <Stack alignItems="center" height="100%" padding={2}>
      <Stack direction="row" alignItems="center" spacing={2} marginBottom={4}>
        <img
          src="/logo_pixel_art.svg"
          alt="den.computer logo"
          style={{ width: 48, height: 48 }}
        />
        <Typography variant="h1" fontSize="2rem">
          den.computer
        </Typography>
      </Stack>

      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" marginBottom={2}>
            Join the waitlist
          </Typography>

          <Typography variant="body1" marginBottom={3}>
            Enter your email address and we'll let you know when your spot is
            ready.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              sx={{ width: "100%", marginBottom: 2 }}
              inputProps={{
                style: {
                  padding: 16,
                  border: "1px solid #ccc",
                },
              }}
              disableUnderline
              autoComplete="email"
              autoFocus
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                paddingY: 1.5,
                textTransform: "none",
                borderRadius: 0,
              }}
            >
              Join the waitlist
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
