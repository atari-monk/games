from pydub import AudioSegment
from pydub.generators import Square, Pulse

# Helper to make a chiptune note
def make_note(freq, duration_ms, volume_db=-5):
    return Square(freq).to_audio_segment(duration=duration_ms).apply_gain(volume_db)

# Helper to make a simple bass note
def make_bass_note(freq, duration_ms, volume_db=-10):
    return Pulse(freq).to_audio_segment(duration=duration_ms).apply_gain(volume_db)

# Main melody notes (playful 8-bit riff)
melody_notes = [
    make_note(523, 200),  # C5
    make_note(587, 200),  # D5
    make_note(659, 200),  # E5
    make_note(784, 200),  # G5
    make_note(659, 200),
    make_note(587, 200),
    make_note(523, 400),  # C5 hold
    make_note(784, 200),
    make_note(880, 200),  # A5
    make_note(784, 200),
    make_note(659, 200),
    make_note(587, 200),
    make_note(523, 400)
]

# Combine melody with short pauses
melody = AudioSegment.silent(duration=50)
for note in melody_notes:
    melody += note + AudioSegment.silent(duration=50)

# Simple bass line: C, G, A, G loop
bass_pattern = [
    make_bass_note(130, 400),  # C3
    make_bass_note(196, 400),  # G3
    make_bass_note(220, 400),  # A3
    make_bass_note(196, 400)   # G3
]

# Repeat bass to match melody length
bass = AudioSegment.silent(duration=0)
while len(bass) < len(melody):
    for note in bass_pattern:
        bass += note
bass = bass[:len(melody)]

# Mix melody and bass
loop_track = melody.overlay(bass)

# Export to MP3 or WAV
loop_track.export("8bit-rps-loop.mp3", format="mp3")
print("Loop exported as '8bit-rps-loop.mp3'")
