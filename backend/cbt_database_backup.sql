PGDMP           	            }            cbt_database    16.4    16.4     >           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            @           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            A           1262    16397    cbt_database    DATABASE     �   CREATE DATABASE cbt_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Nigeria.1252';
    DROP DATABASE cbt_database;
                postgres    false                        2615    53910    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            B           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            C           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    54090    Answer    TABLE       CREATE TABLE public."Answer" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "examID" text NOT NULL,
    "questionID" integer NOT NULL,
    answer text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer
);
    DROP TABLE public."Answer";
       public         heap    postgres    false    5            �            1259    54089    Answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Answer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Answer_id_seq";
       public          postgres    false    5    235            D           0    0    Answer_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Answer_id_seq" OWNED BY public."Answer".id;
          public          postgres    false    234            �            1259    53978    Course    TABLE     �   CREATE TABLE public."Course" (
    id integer NOT NULL,
    "courseCode" text NOT NULL,
    "courseTitle" text NOT NULL,
    "courseDescription" text NOT NULL,
    department text NOT NULL,
    credits integer NOT NULL,
    level integer NOT NULL
);
    DROP TABLE public."Course";
       public         heap    postgres    false    5            �            1259    53977    Course_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Course_id_seq";
       public          postgres    false    5    225            E           0    0    Course_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;
          public          postgres    false    224            �            1259    54070 
   Enrollment    TABLE     �   CREATE TABLE public."Enrollment" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "courseId" integer NOT NULL,
    "enrollmentDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "examID" text
);
     DROP TABLE public."Enrollment";
       public         heap    postgres    false    5            �            1259    54069    Enrollment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Enrollment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Enrollment_id_seq";
       public          postgres    false    5    233            F           0    0    Enrollment_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Enrollment_id_seq" OWNED BY public."Enrollment".id;
          public          postgres    false    232            �            1259    53987    Exam    TABLE     	  CREATE TABLE public."Exam" (
    id integer NOT NULL,
    "examID" text NOT NULL,
    "examTitle" text NOT NULL,
    "courseId" integer NOT NULL,
    "examDate" timestamp(3) without time zone NOT NULL,
    "examTime" text NOT NULL,
    duration integer NOT NULL
);
    DROP TABLE public."Exam";
       public         heap    postgres    false    5            �            1259    54150    ExamAttempt    TABLE     `  CREATE TABLE public."ExamAttempt" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "examID" text NOT NULL,
    "examDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "totalScore" integer NOT NULL,
    grade text NOT NULL,
    "attemptDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public."ExamAttempt";
       public         heap    postgres    false    5            �            1259    54149    ExamAttempt_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ExamAttempt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ExamAttempt_id_seq";
       public          postgres    false    5    239            G           0    0    ExamAttempt_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ExamAttempt_id_seq" OWNED BY public."ExamAttempt".id;
          public          postgres    false    238            �            1259    53986    Exam_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Exam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Exam_id_seq";
       public          postgres    false    5    227            H           0    0    Exam_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Exam_id_seq" OWNED BY public."Exam".id;
          public          postgres    false    226            �            1259    54135    PasswordReset    TABLE     �   CREATE TABLE public."PasswordReset" (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);
 #   DROP TABLE public."PasswordReset";
       public         heap    postgres    false    5            �            1259    54134    PasswordReset_id_seq    SEQUENCE     �   CREATE SEQUENCE public."PasswordReset_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."PasswordReset_id_seq";
       public          postgres    false    5    237            I           0    0    PasswordReset_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."PasswordReset_id_seq" OWNED BY public."PasswordReset".id;
          public          postgres    false    236            �            1259    53948    Question    TABLE       CREATE TABLE public."Question" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "questionID" text NOT NULL,
    "questionText" text NOT NULL,
    "questionType" text NOT NULL,
    "correctAnswer" text NOT NULL,
    "examID" text NOT NULL,
    options text[]
);
    DROP TABLE public."Question";
       public         heap    postgres    false    5            �            1259    53947    Question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Question_id_seq";
       public          postgres    false    5    221            J           0    0    Question_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;
          public          postgres    false    220            �            1259    53996    Result    TABLE       CREATE TABLE public."Result" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    grade text NOT NULL,
    "studentID" integer NOT NULL,
    "examAttemptID" integer NOT NULL,
    "examID" text NOT NULL,
    "totalScore" integer NOT NULL,
    "courseTitle" text NOT NULL,
    credits integer NOT NULL,
    department text NOT NULL,
    "examDate" timestamp(3) without time zone NOT NULL,
    "examTitle" text NOT NULL,
    level integer NOT NULL,
    "studentName" text,
    "courseDescription" text
);
    DROP TABLE public."Result";
       public         heap    postgres    false    5            �            1259    53995    Result_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Result_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Result_id_seq";
       public          postgres    false    5    229            K           0    0    Result_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Result_id_seq" OWNED BY public."Result".id;
          public          postgres    false    228            �            1259    53930    Role    TABLE     P   CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Role";
       public         heap    postgres    false    5            �            1259    53929    Role_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Role_id_seq";
       public          postgres    false    5    219            L           0    0    Role_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;
          public          postgres    false    218            �            1259    53969    Student    TABLE        CREATE TABLE public."Student" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    department text NOT NULL,
    level text NOT NULL,
    password text NOT NULL,
    "studentID" integer NOT NULL,
    "roleId" integer NOT NULL
);
    DROP TABLE public."Student";
       public         heap    postgres    false    5            �            1259    54052    StudentExam    TABLE     �   CREATE TABLE public."StudentExam" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    score integer NOT NULL,
    submitted boolean DEFAULT false NOT NULL,
    "submittedAt" timestamp(3) without time zone,
    "examID" text NOT NULL
);
 !   DROP TABLE public."StudentExam";
       public         heap    postgres    false    5            �            1259    54051    StudentExam_id_seq    SEQUENCE     �   CREATE SEQUENCE public."StudentExam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."StudentExam_id_seq";
       public          postgres    false    231    5            M           0    0    StudentExam_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."StudentExam_id_seq" OWNED BY public."StudentExam".id;
          public          postgres    false    230            �            1259    53968    Student_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Student_id_seq";
       public          postgres    false    223    5            N           0    0    Student_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;
          public          postgres    false    222            �            1259    53921    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "roleId" integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    5            �            1259    53920    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    217    5            O           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    216            �            1259    53911    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            R           2604    54093 	   Answer id    DEFAULT     j   ALTER TABLE ONLY public."Answer" ALTER COLUMN id SET DEFAULT nextval('public."Answer_id_seq"'::regclass);
 :   ALTER TABLE public."Answer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            K           2604    53981 	   Course id    DEFAULT     j   ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);
 :   ALTER TABLE public."Course" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            P           2604    54073    Enrollment id    DEFAULT     r   ALTER TABLE ONLY public."Enrollment" ALTER COLUMN id SET DEFAULT nextval('public."Enrollment_id_seq"'::regclass);
 >   ALTER TABLE public."Enrollment" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    233    233            L           2604    53990    Exam id    DEFAULT     f   ALTER TABLE ONLY public."Exam" ALTER COLUMN id SET DEFAULT nextval('public."Exam_id_seq"'::regclass);
 8   ALTER TABLE public."Exam" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            V           2604    54153    ExamAttempt id    DEFAULT     t   ALTER TABLE ONLY public."ExamAttempt" ALTER COLUMN id SET DEFAULT nextval('public."ExamAttempt_id_seq"'::regclass);
 ?   ALTER TABLE public."ExamAttempt" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            T           2604    54138    PasswordReset id    DEFAULT     x   ALTER TABLE ONLY public."PasswordReset" ALTER COLUMN id SET DEFAULT nextval('public."PasswordReset_id_seq"'::regclass);
 A   ALTER TABLE public."PasswordReset" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    237    237            I           2604    53951    Question id    DEFAULT     n   ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);
 <   ALTER TABLE public."Question" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            M           2604    53999 	   Result id    DEFAULT     j   ALTER TABLE ONLY public."Result" ALTER COLUMN id SET DEFAULT nextval('public."Result_id_seq"'::regclass);
 :   ALTER TABLE public."Result" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            H           2604    53933    Role id    DEFAULT     f   ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);
 8   ALTER TABLE public."Role" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            J           2604    53972 
   Student id    DEFAULT     l   ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);
 ;   ALTER TABLE public."Student" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            N           2604    54055    StudentExam id    DEFAULT     t   ALTER TABLE ONLY public."StudentExam" ALTER COLUMN id SET DEFAULT nextval('public."StudentExam_id_seq"'::regclass);
 ?   ALTER TABLE public."StudentExam" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            G           2604    53924    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            7          0    54090    Answer 
   TABLE DATA           j   COPY public."Answer" (id, "studentID", "examID", "questionID", answer, "createdAt", "userId") FROM stdin;
    public          postgres    false    235   h�       -          0    53978    Course 
   TABLE DATA           t   COPY public."Course" (id, "courseCode", "courseTitle", "courseDescription", department, credits, level) FROM stdin;
    public          postgres    false    225   B�       5          0    54070 
   Enrollment 
   TABLE DATA           _   COPY public."Enrollment" (id, "studentID", "courseId", "enrollmentDate", "examID") FROM stdin;
    public          postgres    false    233   ]�       /          0    53987    Exam 
   TABLE DATA           i   COPY public."Exam" (id, "examID", "examTitle", "courseId", "examDate", "examTime", duration) FROM stdin;
    public          postgres    false    227   �       ;          0    54150    ExamAttempt 
   TABLE DATA           r   COPY public."ExamAttempt" (id, "studentID", "examID", "examDate", "totalScore", grade, "attemptDate") FROM stdin;
    public          postgres    false    239   ��       9          0    54135    PasswordReset 
   TABLE DATA           K   COPY public."PasswordReset" (id, token, "createdAt", "userId") FROM stdin;
    public          postgres    false    237   k�       )          0    53948    Question 
   TABLE DATA           �   COPY public."Question" (id, "courseId", "questionID", "questionText", "questionType", "correctAnswer", "examID", options) FROM stdin;
    public          postgres    false    221   ��       1          0    53996    Result 
   TABLE DATA           �   COPY public."Result" (id, "courseId", grade, "studentID", "examAttemptID", "examID", "totalScore", "courseTitle", credits, department, "examDate", "examTitle", level, "studentName", "courseDescription") FROM stdin;
    public          postgres    false    229   �       '          0    53930    Role 
   TABLE DATA           *   COPY public."Role" (id, name) FROM stdin;
    public          postgres    false    219   ��       +          0    53969    Student 
   TABLE DATA           h   COPY public."Student" (id, name, email, department, level, password, "studentID", "roleId") FROM stdin;
    public          postgres    false    223   Ѩ       3          0    54052    StudentExam 
   TABLE DATA           c   COPY public."StudentExam" (id, "studentID", score, submitted, "submittedAt", "examID") FROM stdin;
    public          postgres    false    231   �       %          0    53921    User 
   TABLE DATA           E   COPY public."User" (id, email, password, "roleId", name) FROM stdin;
    public          postgres    false    217   ��       #          0    53911    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   )�       P           0    0    Answer_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Answer_id_seq"', 70, true);
          public          postgres    false    234            Q           0    0    Course_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Course_id_seq"', 3, true);
          public          postgres    false    224            R           0    0    Enrollment_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Enrollment_id_seq"', 12, true);
          public          postgres    false    232            S           0    0    ExamAttempt_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."ExamAttempt_id_seq"', 13, true);
          public          postgres    false    238            T           0    0    Exam_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Exam_id_seq"', 3, true);
          public          postgres    false    226            U           0    0    PasswordReset_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."PasswordReset_id_seq"', 1, false);
          public          postgres    false    236            V           0    0    Question_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Question_id_seq"', 5, true);
          public          postgres    false    220            W           0    0    Result_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Result_id_seq"', 7, true);
          public          postgres    false    228            X           0    0    Role_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Role_id_seq"', 3, true);
          public          postgres    false    218            Y           0    0    StudentExam_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."StudentExam_id_seq"', 12, true);
          public          postgres    false    230            Z           0    0    Student_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Student_id_seq"', 11, true);
          public          postgres    false    222            [           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 1, true);
          public          postgres    false    216            x           2606    54098    Answer Answer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_pkey";
       public            postgres    false    235            j           2606    53985    Course Course_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Course" DROP CONSTRAINT "Course_pkey";
       public            postgres    false    225            u           2606    54076    Enrollment Enrollment_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Enrollment" DROP CONSTRAINT "Enrollment_pkey";
       public            postgres    false    233            }           2606    54158    ExamAttempt ExamAttempt_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ExamAttempt" DROP CONSTRAINT "ExamAttempt_pkey";
       public            postgres    false    239            m           2606    53994    Exam Exam_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Exam"
    ADD CONSTRAINT "Exam_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Exam" DROP CONSTRAINT "Exam_pkey";
       public            postgres    false    227            {           2606    54143     PasswordReset PasswordReset_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."PasswordReset" DROP CONSTRAINT "PasswordReset_pkey";
       public            postgres    false    237            b           2606    53955    Question Question_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_pkey";
       public            postgres    false    221            o           2606    54003    Result Result_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Result" DROP CONSTRAINT "Result_pkey";
       public            postgres    false    229            `           2606    53937    Role Role_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            postgres    false    219            r           2606    54058    StudentExam StudentExam_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."StudentExam" DROP CONSTRAINT "StudentExam_pkey";
       public            postgres    false    231            f           2606    53976    Student Student_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_pkey";
       public            postgres    false    223            ]           2606    53928    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    217            Z           2606    53919 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            y           1259    60693 &   Answer_studentID_examID_questionID_key    INDEX     �   CREATE UNIQUE INDEX "Answer_studentID_examID_questionID_key" ON public."Answer" USING btree ("studentID", "examID", "questionID");
 <   DROP INDEX public."Answer_studentID_examID_questionID_key";
       public            postgres    false    235    235    235            h           1259    54039    Course_courseCode_key    INDEX     [   CREATE UNIQUE INDEX "Course_courseCode_key" ON public."Course" USING btree ("courseCode");
 +   DROP INDEX public."Course_courseCode_key";
       public            postgres    false    225            v           1259    54077 !   Enrollment_studentID_courseId_key    INDEX     v   CREATE UNIQUE INDEX "Enrollment_studentID_courseId_key" ON public."Enrollment" USING btree ("studentID", "courseId");
 7   DROP INDEX public."Enrollment_studentID_courseId_key";
       public            postgres    false    233    233            ~           1259    54217     ExamAttempt_studentID_examID_key    INDEX     t   CREATE UNIQUE INDEX "ExamAttempt_studentID_examID_key" ON public."ExamAttempt" USING btree ("studentID", "examID");
 6   DROP INDEX public."ExamAttempt_studentID_examID_key";
       public            postgres    false    239    239            k           1259    54007    Exam_examID_key    INDEX     O   CREATE UNIQUE INDEX "Exam_examID_key" ON public."Exam" USING btree ("examID");
 %   DROP INDEX public."Exam_examID_key";
       public            postgres    false    227            c           1259    54008    Question_questionID_key    INDEX     _   CREATE UNIQUE INDEX "Question_questionID_key" ON public."Question" USING btree ("questionID");
 -   DROP INDEX public."Question_questionID_key";
       public            postgres    false    221            p           1259    54225 )   Result_studentID_examID_examAttemptID_key    INDEX     �   CREATE UNIQUE INDEX "Result_studentID_examID_examAttemptID_key" ON public."Result" USING btree ("studentID", "examID", "examAttemptID");
 ?   DROP INDEX public."Result_studentID_examID_examAttemptID_key";
       public            postgres    false    229    229    229            ^           1259    53957    Role_name_key    INDEX     I   CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);
 #   DROP INDEX public."Role_name_key";
       public            postgres    false    219            s           1259    54246     StudentExam_studentID_examID_key    INDEX     t   CREATE UNIQUE INDEX "StudentExam_studentID_examID_key" ON public."StudentExam" USING btree ("studentID", "examID");
 6   DROP INDEX public."StudentExam_studentID_examID_key";
       public            postgres    false    231    231            d           1259    54005    Student_email_key    INDEX     Q   CREATE UNIQUE INDEX "Student_email_key" ON public."Student" USING btree (email);
 '   DROP INDEX public."Student_email_key";
       public            postgres    false    223            g           1259    54045    Student_studentID_key    INDEX     [   CREATE UNIQUE INDEX "Student_studentID_key" ON public."Student" USING btree ("studentID");
 +   DROP INDEX public."Student_studentID_key";
       public            postgres    false    223            [           1259    53956    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    217            �           2606    54212    Answer Answer_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_examID_fkey";
       public          postgres    false    227    235    4715            �           2606    54114    Answer Answer_questionID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_questionID_fkey";
       public          postgres    false    221    4706    235            �           2606    54119    Answer Answer_studentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_studentID_fkey";
       public          postgres    false    235    223    4710            �           2606    54124    Answer Answer_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_userId_fkey";
       public          postgres    false    217    235    4701            �           2606    54083 #   Enrollment Enrollment_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";
       public          postgres    false    225    233    4714            �           2606    55588 !   Enrollment Enrollment_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public."Enrollment" DROP CONSTRAINT "Enrollment_examID_fkey";
       public          postgres    false    4715    227    233            �           2606    54078 $   Enrollment Enrollment_studentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public."Enrollment" DROP CONSTRAINT "Enrollment_studentID_fkey";
       public          postgres    false    233    4710    223            �           2606    54233 #   ExamAttempt ExamAttempt_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."ExamAttempt" DROP CONSTRAINT "ExamAttempt_examID_fkey";
       public          postgres    false    4715    239    227            �           2606    54160 &   ExamAttempt ExamAttempt_studentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."ExamAttempt" DROP CONSTRAINT "ExamAttempt_studentID_fkey";
       public          postgres    false    4710    239    223            �           2606    54009    Exam Exam_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Exam"
    ADD CONSTRAINT "Exam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Exam" DROP CONSTRAINT "Exam_courseId_fkey";
       public          postgres    false    4714    225    227            �           2606    54144 '   PasswordReset PasswordReset_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public."PasswordReset" DROP CONSTRAINT "PasswordReset_userId_fkey";
       public          postgres    false    223    237    4710            �           2606    54014    Question Question_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_courseId_fkey";
       public          postgres    false    4714    221    225            �           2606    54201    Question Question_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_examID_fkey";
       public          postgres    false    221    4715    227            �           2606    54029    Result Result_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Result" DROP CONSTRAINT "Result_courseId_fkey";
       public          postgres    false    4714    229    225            �           2606    54170     Result Result_examAttemptID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_examAttemptID_fkey" FOREIGN KEY ("examAttemptID") REFERENCES public."ExamAttempt"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."Result" DROP CONSTRAINT "Result_examAttemptID_fkey";
       public          postgres    false    4733    239    229            �           2606    54238    Result Result_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Result" DROP CONSTRAINT "Result_examID_fkey";
       public          postgres    false    227    229    4715            �           2606    54046    Result Result_studentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Result" DROP CONSTRAINT "Result_studentID_fkey";
       public          postgres    false    229    4710    223            �           2606    54247 #   StudentExam StudentExam_examID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."StudentExam" DROP CONSTRAINT "StudentExam_examID_fkey";
       public          postgres    false    4715    227    231            �           2606    54059 &   StudentExam StudentExam_studentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."StudentExam" DROP CONSTRAINT "StudentExam_studentID_fkey";
       public          postgres    false    231    223    4710            �           2606    54129    Student Student_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_roleId_fkey";
       public          postgres    false    219    223    4704                       2606    53958    User User_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_roleId_fkey";
       public          postgres    false    217    219    4704            7   �  x����n�6���S����v`�k�,����0c���`��=�q��&���
$����s!�]e����!��du�v�0<�9=n���>�����<��/�5l��9mS?�vb��<���:�7�~l��~��ƩRB�[!o�gJ���*��]����	UU��Ħ4�ǡ���o�E0u4���v�süaw��ؗ� �yp� ���ܥ_�K;~c��m�G�t?6�����;j��j����~`O����!r����ib�w��#�D���4���&����K��w���Mҁ�P6�B�՗15O����v�f�-5����r#��%h#+�)�j[[Ͻ)PE�W2V�Z(n0s�&��clVs��Q[�X�Jɭ��j	�"c�rÕ���`�������<S=�^�Y8��*�@ ˝-jJ� :Y-���E����
B��Y\�x�%h�6amg�@����(_��P?��+�(.]i
V�BgOj��z�!j+9�J��K�F:0d������T�cLzB�F��i ���j��K�j���VtGj�Ba�Y����,擫���F&b)uˣ,��zB���' T�Ƣ���W5-�G�MR�8{���E0<�,գ�;�_=����c)��*Ń�:QI<�	`y�Z���!j�O�Jc�dI$Y���MPr�����Ʉ!kn\�E'H�疟�r��3��J�~����%�K��!�`�Q�H�a����4%,.����֡��r��F��|
��{�����U(����^wRk��S��|t��b��;��v�ݽ�.
(��G���&^�3����|~i�=�u`cʦ�M�Q��kf0�W֞]���?�����<���I8���3Մ�������F�jp�?�H��k�H����?
A�4ղ���Ǟ�͍�\O�!r+�-:����R	�"��X&䡹���>�do��Z��;iQ����#|7�'R���Q[B��N��᠊A�777� O$Ù      -     x���An�0E��> B0�n�袚Y�Ɠx $�qF��k �T���`�?��;3����̛O�I>P&ZP�Mp�C\�,�p���%s�|3'�σX�rp�P�a��돍�X%AN��Z:h�휝#�q���D���Uo`+>�Tӌ婐�(��d���Td\&Rs�-����j���ٓ�<*A�E:FH��Jf*���.�,�<�ћ�m��Q�ɼ���n[-�ݟ/����Y ޟ�ͫ��q�7�7L���F�|�6UU}�Ծ�      5   �   x�eл�0К����O��.E��)�������u<��ԝx��QϪI�3<ߏYۡ���Oe�7U�F=��`�N�4C�z*�zS�b�
��j�Jk���l��nJSGiE�_�W�7֔���qe�Q��t�-&���~��"�ōY��:rԪ�R�5>XJ���N�      /   f   x�3�t�p�500���L)I-�Up�H���K,����4�4202�50�52V00�#NC����ijb`�e5��	FP́�	�P�9݀�rP��=... ��/j      ;   �   x�u�1�!Ec8�\`(>��dl��s�s���ڶSE��G������
2�x*�����1R���ɶz�դW[�	q!�ꑥ����U���nH�,*}�7��liu���՞T?�&���;���門��OJ��>��8F����~EP�������*֮�~E�1¦���q�"mi0#����1��Q�>�+�0��"�      9      x������ � �      )   �  x��T�N�@=;_�ʥZ��*	�TUT�Aj�����Sֻfwm�*��ol�D��������7of�Ͳ�j9;����c~v�����+������hRɦ�r�-�6!���qE�'��Cv�<��z`祓�M�0�k�eC&&J\��kYk�&��5�%��e�sSq*}��_7��F�""n������`�����r�Q�����8X�p8��;�P�҉K�	(	��uZ����h��G�g�����=07�F([�ܱh%��+6��!W�E߅ �!�.�8=ZoŶ�mD���).}*w�#��#����[��a���.�ا��CP�x�����e�[�Ͷ��tΉh �[sHۮ�N&-Ym�	l����xm�VZIh�j[��ڦ�@.�|{7F��� y��K���%4j�?�{��%��pO�۸ �u�O���+���5uj�E@:4hS�K��4�o$,�M!�����{ �l������:`��ϻ����n�x�A�;�{���h:� ��	`��ʮ#����q@�V�=��������*]Iw����~?8�����ZL9��n|�TV��Ԥ�1XS%�^��	��LE*�~��:VL!/Gʝr��#�~*�S�}vz���+ �/��WdD�&?�M&���3)�      1   o  x���N�0E��W��U��hAB*�6Sgh�:v�G��$����(R$�#ϝ�{�\d�Y��B�?6i��,+奣@��PQ�AI_�������V*2�D!���4���b�����'6��#5��V����9�x��S��|�bW)�F牗9M�5����H˳��!z*A.\|��G�E�c���=(��� ,a�9i�ek�'�H��E��?���	�)�఩.m�U��m�DgO�$@Φ�يt1�>�B�j��2�.�]D{�]ߥ��X�b�.(CZ�[�q��X�� �"�����'1�H,E�Bb*�����Ϳ�Yǂ���A`<�#�-l񈷎bޣ���+�������d4�m�:�      '   (   x�3�LL����2���OI-J,�/�2�,-N-����� �	      +     x���K��8�u�S��5ow(��<ۚM�������{nM��5Uݛ�d����9<�aY�|�(��L�|+�'�w����@/轩Q9	������ �y�}�o�����u'X����׈�W�Uk�/$�"�щ���ҋ?�գ
�cB0�� |������h�Da�����C����&�BtN��E�Ջ�~cX�Vug�3vD���  ��4�_!3�\#нN��~I�vB�J^z������,n��!V­���Dm�r��yT��(J���#2�!���j��j�-̅�2��+ҏHn�}���J�z��:��Mdڶ\������!�V�<�����[����l�9P��'��n�[b�#��e� ��P�ϛzq���J�9���#;�/�UM��s�-�o�w8�=\]j��et�-�U3c�X�u����m�� �waˈ���ξ4�5�h��_s�*��g��WI&�z�A��6['���V�-���X�ݳ=W.}��C�FY��O|<nE�Y�xs����86�:V�#���垫�J咮��J��Zy��܆} $~t�`Y_Fv������?���
�6͐�=���㹻Gfv^��l ���K�&�ب����Z�_��s@kn�/ƭ�Ap��g?�����JwM#it�7[�wfgtN��¹҆D'��}�qO���t������F�׏�_�%Ct;�s��3䵬�n�bՒ~�2���bdZ'9�����Y)/ ��o�����d��      3   �   x�m�;��0К>�/�Ï,�K���)r��?Vj�$��!�@B��q����e�������`3�/.�s��O�d�N�<K������P8J;�����i��U����.�JcPV���/�t��Kߤ�����Pᜲ�B(�a�s��� h�9O8*c�fEC	�O�13�1wj��'o���T      %   u   x�3�,O��KM�/�tH�M���K���T1JT14PItv.������3qɱ�*��)5	�,	O��-1.�ȴ0�7wѯ�2s�*p��r����4�t�H��,�Tp�/�M,V�N����� ��!�      #   y  x���{r����O����|��`�X����%9��Mn�ohҦw)���<���{u��rI�����MWI���T������t�kT?�dsAF˾���$��h�i����yt���8�������s��)�'W?FWc٤��ӹ�-���~��b�'{����������<����?���ߖR:��}X��9j�Z�7j[�o��К��rpnQ�!dY�͗b�\v��G��:�-q�X��;M�̷��S��%U���.��^^=}��B�2��~hO!ļI2����V��[[}i�5G��rQW��z�U&]�iKeh�V��ˍ�u�R�H�6��f惒�ۧ.�Ծ��	w%1���i����َw�&Ǐ𭌒�o4A,m�ݺ��S��Z��f+��6S�q̕{��7	U|�<襸պu�惕�c/���"v����	�)���^����봇��x���lG�����}~~�.�9ІS]�[�c��D'�U�m�RW5�=J:�aE���g�
U�)�� ��Q�j������}(<�c�-�W�J%櫺uE�.���lO�jy������+�[��8�d�>�w����5�Ah�tu�<�F�ih�B��^G��ɤ����+��:\��L��O��(ŋ��9��>?���4w���fA��:�,
�M�̜�1&�m�8uU���M\�2�7VqR̒�-�8֚!��s�H�$I#��oO~���@���s=P���e� ��ݙ�j�R�o}
�(��fe1[R�%;�T��:Ś��
�8��=�*4�
�'���!0������J�r��C�i)����ݯO�r���V_"��\��j���"pߴ�JU�S�X�@d�a�%9g�'�6C�>��`aQ��W�΁���;�?��+e�暿*�H�Li_����N"�]8aР7yg2X�%Fܸ4@P�M���G`�(9��
��
�b������dز�f��5� 
���xcH��+���)\���&��E>=e��r��~�����BA���cv�",]�3�#��ٖ}��%͹�!�H�{J�;Օ�yT��2K�M�Z?-���#-*�3v������Xb
��3��䤞;��?�x9�������ùG��y���&:lʷ��ٚi���9CR�h[5��C��!�lz�����3��g�9����׬ee?V^�j�0b6qӐ��@��6�s�&}oB"|^�1��G_^��FG���N
�L�Ӈ���R0m6;0�q�UB�>k:8���"��W���O�V����&y�YV
ݵ�-Z���
�Z������ؼ��B�����1 � ��[sK6�^�����C��({��y�c8[Y�4ôz�mE��nr�;˔&����k��<Ďﮪ��Iy�O���¬�1��I�26�3� ���ñ��\3f��]9
= �sH��A%��@R����<�W����۞7�s~���g/��������φ�M۞-4B�
䴕���!�� ���c�q����i8aıkc鄇0�
��6Q�U�0i9@��>���*�voR���d'�w����y1�he��C �ѦK8ѦU^�F?ak��:��U��1&�(Ҏ2�9�)�0[��tO=z�W��^�(��9Y��?�6x��b j�ၞ�10v�$�A�¬ʌ�;4�M���72��D:K�k<xl	��mHS�>R[]WF[)�6osC�\��v	#���d��)k�uؠI�S`�^I���w����'�m#���t&��2gS���0]u��j��R���_�)�D	��U������ߨ&<7�W���"������ �PsH!��X�������,����ҴY���R�{��.���>�k�+*�H���e����&VDfe��ʔ�NI`n�%�7{;���{����L�u�i�0��sOZ��C�x6�0�/���J���В`�Z�G����=��8���ko�U���$�ߧ��ɛ
,����
�%b����$�҃�H�8i�ZǈA��A�0<]��9��Τ�G�+�F�IΧKb;����/oI?3�뙘���	/�~��Ӑ�n�H��97��D�}�21�-���E�6��G#ه�C�>���X��`���Gl\uWMj{���8~Ӈ_�ͽ ���`HFM9&:4�E6 S��p<��BoH�0��)@4상�����h�Fz�XM��[���7��Wr��!�܍��1�Z���a���;,��%�l�r���0\q�C��F�@���~aߋـv6*�f���^������z[CCGX~�o���Oo^�=��#G��k��Ha��m_i���	�n%�G34+�Q���אB7�-�Ђ�C�<!�A��Fl&�����[A[��n�N?������vF���[c�I�<چ��Z�v&��:$	�v�ǁM_�~%���{u���T=I;YǙ�ŌUe_D�WV��l��I�)�O��?��_�.�������gnp[cP��M6�Ⱦ�[�<?:S봂+�>j[u�ENڈSA��o�+�ҁ�$����z�dJ��g�"bc&�+% V|�,b2�S��PFl��Yr�n�^+!Y����e|
���5;���U���U��� �خ=��Y������%��@�3����_�lL��ҾG0�|K	ׅ����7Bo	�0`���K$R�&fv���r�C9|	���������W�����g��{����]��^�ީH	�Qds��jy����<J��آ'}��WP�Alx�"3��������bnm�S��/B����I�|��L��$Ѝ3j�#)�m���>r_�)ur�HuE�ہR	|a���}����o��I�Q_&�b� ��x�ێ��8F>��åO>}�r�02���ۦ��M��<�r�6���p֚_>~����9f�     