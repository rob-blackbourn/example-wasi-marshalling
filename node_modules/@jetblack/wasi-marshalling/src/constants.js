export const WASI = {
  // No error occurred. System call completed successfully.
  ESUCCESS: 0,

  // Error codes
  ERRNO: {
    // Argument list too long.
    '2BIG': 1,

    // Permission denied.
    ACCES: 2,

    // Address in use.
    ADDRINUSE: 3,

    // Address not available.
    ADDRNOTAVAIL: 4,

    // Address family not supported.
    AFNOSUPPORT: 5,

    // Resource unavailable, or operation would block.
    AGAIN: 6,

    // Connection already in progress.
    ALREADY: 7,

    // Bad file descriptor.
    BADF: 8,

    // Bad message.
    BADMSG: 9,

    // Device or resource busy.
    BUSY: 10,

    // Operation canceled.
    CANCELED: 11,

    // No child processes.
    CHILD: 12,

    // Connection aborted.
    CONNABORTED: 13,

    // Connection refused.
    CONNREFUSED: 14,

    // Connection reset.
    CONNRESET: 15,

    // Resource deadlock would occur.
    DEADLK: 16,

    // Destination address required.
    DESTADDRREQ: 17,

    // Mathematics argument out of domain of function.
    DOM: 18,

    // Reserved.
    DQUOT: 19,

    // File exists.
    EXIST: 20,

    // Bad address.
    FAULT: 21,

    // File too large.
    FBIG: 22,

    // Host is unreachable.
    HOSTUNREACH: 23,

    // Identifier removed.
    IDRM: 24,

    // Illegal byte sequence.
    ILSEQ: 25,

    // Operation in progress.
    INPROGRESS: 26,

    // Interrupted function.
    INTR: 27,

    // Invalid argument.
    INVAL: 28,

    // I/O error.
    IO: 29,

    // Socket is connected.
    ISCONN: 30,

    // Is a directory.
    ISDIR: 31,

    // Too many levels of symbolic links.
    LOOP: 32,

    // File descriptor value too large.
    MFILE: 33,

    // Too many links.
    MLINK: 34,

    // Message too large.
    MSGSIZE: 35,

    // Reserved.
    MULTIHOP: 36,

    // Filename too long.
    NAMETOOLONG: 37,

    // Network is down.
    NETDOWN: 38,

    // Connection aborted by network.
    NETRESET: 39,

    // Network unreachable.
    NETUNREACH: 40,

    // Too many files open in system.
    NFILE: 41,

    // No buffer space available.
    NOBUFS: 42,

    // No such device.
    NODEV: 43,

    // No such file or directory.
    NOENT: 44,

    // Executable file format error.
    NOEXEC: 45,

    // No locks available.
    NOLCK: 46,

    // Reserved.
    NOLINK: 47,

    // Not enough space.
    NOMEM: 48,

    // No message of the desired type.
    NOMSG: 49,

    // Protocol not available.
    NOPROTOOPT: 50,

    // No space left on device.
    NOSPC: 51,

    // Function not supported.
    NOSYS: 52,

    // The socket is not connected.
    NOTCONN: 53,

    // Not a directory or a symbolic link to a directory.
    NOTDIR: 54,

    // Directory not empty.
    NOTEMPTY: 55,

    // State not recoverable.
    NOTRECOVERABLE: 56,

    // Not a socket.
    NOTSOCK: 57,

    // Not supported, or operation not supported on socket.
    NOTSUP: 58,

    // Inappropriate I/O control operation.
    NOTTY: 59,

    // No such device or address.
    NXIO: 60,

    // Value too large to be stored in data type.
    OVERFLOW: 61,

    // Previous owner died.
    OWNERDEAD: 62,

    // Operation not permitted.
    PERM: 63,

    // Broken pipe.
    PIPE: 64,

    // Protocol error.
    PROTO: 65,

    // Protocol not supported.
    PROTONOSUPPORT: 66,

    // Protocol wrong type for socket.
    PROTOTYPE: 67,

    // Result too large.
    RANGE: 68,

    // Read-only file system.
    ROFS: 69,

    // Invalid seek.
    SPIPE: 70,

    // No such process.
    SRCH: 71,

    // Reserved.
    STALE: 72,

    // Connection timed out.
    TIMEDOUT: 73,

    // Text file busy.
    TXTBSY: 74,

    // Cross-device link.
    XDEV: 75,

    // Extension: Capabilities insufficient.
    NOTCAPABLE: 76

  },
  FILETYPE: {
    UNKNOWN: 0,
    BLOCK_DEVICE: 1,
    CHARACTER_DEVICE: 2,
    DIRECTORY: 3,
    REGULAR_FILE: 4,
    SOCKET_DGRAM: 5,
    SOCKET_STREAM: 6,
    SYMBOLIC_LINK: 7
  },

  // Flags for files descriptors.
  FDFLAGS: {
    // Append mode: Data written to the file is always appended to the file's end.
    APPEND: 1,

    // Write according to synchronized I/O data integrity completion. Only the data stored in the file is synchronized.
    DSYNC: 2,

    // Non-blocking mode.
    NONBLOCK: 4,

    // Synchronized read I/O operations.
    RSYNC: 8,

    // Write according to synchronized I/O file integrity completion. In
    // addition to synchronizing the data stored in the file, the implementation
    // may also synchronously update the file's metadata.
    SYNC: 16
  },

  // Flags for rights
  RIGHTS: {
    FD: {
      DATASYNC: 1n,
      READ: 2n,
      SEEK: 4n,
      FDSTAT_SET_FLAGS: 8n,
      SYNC: 16n,
      TELL: 32n,
      WRITE: 64n,
      ADVISE: 128n,
      ALLOCATE: 256n,
      READDIR: 16384n,
      FILESTAT_GET: 2097152n,
      FILESTAT_SET_SIZE: 4194304n,
      FILESTAT_SET_TIMES: 8388608n
    },
    PATH: {
      CREATE_DIRECTORY: 512n,
      CREATE_FILE: 1024n,
      LINK_SOURCE: 2048n,
      LINK_TARGET: 4096n,
      OPEN: 8192n,
      READLINK: 32768n,
      RENAME_SOURCE: 65536n,
      RENAME_TARGET: 131072n,
      FILESTAT_GET: 262144n,
      FILESTAT_SET_SIZE: 524288n,
      FILESTAT_SET_TIMES: 1048576n,
      SYMLINK: 16777216n,
      REMOVE_DIRECTORY: 33554432n,
      UNLINK_FILE: 67108864n
    },
    POLL_FD_READWRITE: 134217728n,
    SOCK_SHUTDOWN: 268435456n
  },
  ADVICE: {
    // The application has no advice to give on its behavior with respect to the specified data.
    NORMAL: 0,

    // The application expects to access the specified data sequentially from lower offsets to higher offsets.
    SEQUENTIAL: 1,

    // The application expects to access the specified data in a random order.
    RANDOM: 2,

    // The application expects to access the specified data in the near future.
    WILLNEED: 3,

    // The application expects that it will not access the specified data in the near future.
    DONTNEED: 4,

    // The application expects to access the specified data once and then not reuse it thereafter.
    NOREUSE: 5
  }
}

export const STDOUT = 1
export const STDERR = 2
